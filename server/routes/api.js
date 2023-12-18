const express = require('express')
const router = express.Router()
const axios = require('axios')
const {consts} = require('../../config')
const RECIPES_API = consts.RECIPES_API
const dairyIngredients = consts.dairyIngredients
const glutenIngredients = consts.glutenIngredients

let recipes = []


function filterRecipesByAllergies(recipes, allergicToGluten, allergicToDairy) {
  let filteredRecipes = [];

    const hasGlutenIngredients = recipes.filter(recipe =>
      recipe.ingredients.some(ingredient => glutenIngredients.includes(ingredient)))
    const hasDairyIngredients = recipes.filter(recipe =>
      recipe.ingredients.some(ingredient => dairyIngredients.includes(ingredient)))
  
    if (allergicToGluten=='true' && allergicToDairy== 'true') {
      for(let recipe of recipes)
      {
        if(!hasDairyIngredients.includes(recipe)&& !hasGlutenIngredients.includes(recipe)){
          filteredRecipes.push(recipe)
        }
      }
    }
    else if(allergicToGluten == 'true'){
      for(let recipe of recipes)
      {
        if(!hasGlutenIngredients.includes(recipe)){
          filteredRecipes.push(recipe)
        }
      }

    }

    else if(allergicToDairy == 'true'){
      for(let recipe of recipes)
      {
        if(!hasDairyIngredients.includes(recipe)){
          filteredRecipes.push(recipe)
        }
      }
    }

    else{
      filteredRecipes = recipes
    }
    return filteredRecipes
}

router.get('/recipes/:ingredient/:gluten/:diary', function (req, res) {
    
    let {ingredient, gluten, diary} = req.params
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
      
      recipes = filterRecipesByAllergies(recipes, gluten, diary);
      res.send(recipes)
  })
  .catch(function (error) {
    console.log(error)
    res.send({message:"no related recipes"})
  })
})


router.get('/ingredient/:id', function (req, res) {
    let id = req.params.id
    let recipeIndex = recipes.findIndex(w => w.idMeal == id)
    if(recipeIndex != -1){
        res.send(recipes[recipeIndex].ingredients[0])
    }
    else{
        res.send({message:"not found!"})
    }
})

module.exports = router