const express = require('express')
const router = express.Router()
const axios = require('axios')
const {consts} = require('../../config')
const RECIPES_API = consts.RECIPES_API
const dairyIngredients = consts.dairyIngredients
const glutenIngredients = consts.glutenIngredients
const noRecipesFoundMess = consts.noRecipesFoundMess
const recipeDoesnotExist = consts.recipeDoesnotExist

let recipes = []
let favorites = []

const removeRecipeAccordingTo = function(filteredRecipes, condition){
  if(condition!='false'){
    for(let recipe of recipes){

      if(filteredRecipes.includes(recipe)){
        let index = recipes.indexOf(recipe);
        if (index !== -1) {
          recipes.splice(index, 1);
        }
      }
    }
  }
}

function filterRecipesByAllergies(allergicToGluten, allergicToDairy, excludeIng) {

    const hasGlutenIngredients = recipes.filter(recipe =>
      recipe.ingredients.some(ingredient => glutenIngredients.includes(ingredient)))
    const hasDairyIngredients = recipes.filter(recipe =>
      recipe.ingredients.some(ingredient => dairyIngredients.includes(ingredient)))
    const hasExcludedIngredients = recipes.filter(recipe =>
      recipe.ingredients.some(ingredient => excludeIng==ingredient))

    removeRecipeAccordingTo(hasGlutenIngredients,allergicToGluten)
    removeRecipeAccordingTo(hasDairyIngredients,allergicToDairy)
    removeRecipeAccordingTo(hasExcludedIngredients,excludeIng)
}


router.get('/recipes/:ingredient/:gluten/:diary/:exclude', function (req, res) {
    
    let {ingredient, gluten, diary, exclude} = req.params
    axios.get(RECIPES_API+ingredient)
      .then(function (response) {
        recipes = response.data.results
        recipes = recipes.map(({ idMeal, title, thumbnail, href, ingredients }) => ({
            idMeal,
            ingredients,
            title,
            thumbnail,
            href
          }))
      filterRecipesByAllergies(gluten, diary, exclude)
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

  if(!favorites.includes(req.body.id))
  {
    let favoriteRecipe =  recipes.find(recipe => recipe.idMeal === req.body.id)
    if(favoriteRecipe!=null)
      favorites.push(favoriteRecipe)
  }
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