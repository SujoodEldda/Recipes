
const RECIPES_API = "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient"
const FOOD_API = "`http://api.giphy.com/v1/gifs/search?q=food&api_key=dBS78jFLZ0L3VCiY33EkbrYyPC508eFS&limit="
const dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
const glutenIngredients = ["Flour","flour","Bread","bread","spaghetti","Biscuits","Beer"]
const noRecipesFoundMess = "no recipes found!"
const recipeDoesnotExist = "the recipe does not exist"
const Recipes_Num_Per_Page = 6
const sensitives = {'gluten': glutenIngredients,
                    'dairy': dairyIngredients,
                    'exclude':[]
                    }

module.exports.consts = {RECIPES_API,FOOD_API, dairyIngredients, glutenIngredients, noRecipesFoundMess, recipeDoesnotExist, sensitives, Recipes_Num_Per_Page}