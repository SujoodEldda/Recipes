const express = require('express')
const router = express.Router()
const axios = require('axios')
const {consts} = require('../../config')
const RECIPES_API = consts.RECIPES_API
const dairyIngredients = consts.dairyIngredients
const glutenIngredients = consts.glutenIngredients
const noRecipesFoundMess = consts.noRecipesFoundMess
const recipeDoesnotExist = consts.recipeDoesnotExist
const sensitives = consts.sensitives

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
  recipes = recipes.map(({ idMeal, title, thumbnail, href, ingredients }) => ({//todo: make in a function!
    idMeal,
    ingredients,
    title,
    thumbnail,
    href
  }))
}

router.get('/:ingredient', function (req, res) {
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
        res.send(recipes)
  })
  .catch(function (error) {
    console.log(error)
    res.send({message: noRecipesFoundMess})
  })
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