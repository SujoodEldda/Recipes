const express = require('express')
const router = express.Router()
const axios = require('axios')
const {consts} = require('../../config')
const { faker } = require('@faker-js/faker')
const RECIPES_API = consts.RECIPES_API
const dairyIngredients = consts.dairyIngredients
const glutenIngredients = consts.glutenIngredients
const noRecipesFoundMess = consts.noRecipesFoundMess
const recipeDoesnotExist = consts.recipeDoesnotExist
const sensitives = consts.sensitives
const FOOD_API = consts.FOOD_API
const Recipes_Num_Per_Page = consts.Recipes_Num_Per_Page


let recipes = []
let favorites = []

const containSensitivity = function(sensitive, recipe){
  for( let ingredient of recipe.ingredients){
      if(sensitives[sensitive].includes(ingredient)){
        return true
      }
  }
  return false
}

const filterRecipesByAllergies = function(sensitivesArr){
  for(let sensitive of sensitivesArr){
      recipes = recipes.filter((recipe)=> !containSensitivity(sensitive,recipe) )
  }
}

const mapRecipesData = function(){
  recipes = recipes.map(({ idMeal, title, thumbnail, href, ingredients }) => ({
    idMeal,
    ingredients,
    title,
    thumbnail,
    href
  }))
}

router.get('/recipes/:ingredient', function (req, res) {
    sensitives['exclude'] = []
    let ingredient = req.params.ingredient
    let keys = req.query
    axios.get(`${RECIPES_API}/${ingredient}`) //more readable
    .then(function (response) {
      recipes = response.data.results 
        mapRecipesData()
        let sensitivesArr = []
        sensitives['exclude'].push(keys.exclude)
        for(let sensitive of Object.keys(keys))
        {
          if(keys[sensitive]!='false')
            sensitivesArr.push(sensitive)
        }
        filterRecipesByAllergies(sensitivesArr)
        
        for(let recipe of recipes){
          recipe.chief = faker.person.fullName()
          recipe.rating = Math.floor(Math.random() * 6)
        }
        axios.get("http://api.giphy.com/v1/gifs/search?q=food&api_key=dBS78jFLZ0L3VCiY33EkbrYyPC508eFS&limit="+recipes.length) 
          .then(function (response) {
            for(let recipeIndex in recipes){
              recipes[recipeIndex].gif = response.data.data[recipeIndex].embed_url
            }
            let news = pagination(0)
            res.send(news)
          })
  })
  .catch(function (error) {
    console.log(error)
    res.send({message: noRecipesFoundMess})
  })
})

const pagination = function(numPage){
  let gotTo = numPage*Recipes_Num_Per_Page
  let newRecipes = recipes.slice(gotTo, gotTo + Recipes_Num_Per_Page-1)
  return newRecipes
}
router.get('/pages/:page', function (req, res) {
  let page = req.params.page
  let newRecipes = pagination(page)
  res.send(newRecipes)
}) 

router.get('/ingredient/:id', function (req, res) {
    let id = req.params.id
    let recipeIndex = recipes.findIndex(w => w.idMeal == id)
    if(recipeIndex != -1){
        res.send(recipes[recipeIndex].ingredients[0])
    }
    else{
        res.status(404).send({ "Error": recipeDoesnotExist})
    }
})

router.post('/favorite', function(req,res){
  let indexOfExisting =  favorites.findIndex(recipe => recipe.idMeal === req.body.id)
  if(indexOfExisting!=-1){
    favorites.splice(indexOfExisting, 1)
  }
  else
  {
    let favoriteRecipe =  recipes.find(recipe => recipe.idMeal === req.body.id)
    if(favoriteRecipe!=null)
      favorites.push(favoriteRecipe)
  }
  res.end()
})

router.get('/favorite', function(req,res){
  if(favorites.length > 0){
    res.send(favorites)
  }
  else{
      res.send({ "Error": recipeDoesnotExist})
  }
})

module.exports = router