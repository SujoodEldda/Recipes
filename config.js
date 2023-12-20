
const RECIPES_API = "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient"
const dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
const glutenIngredients = ["Flour","flour","Bread","bread","spaghetti","Biscuits","Beer"]
const noRecipesFoundMess = "no recipes found!"
const recipeDoesnotExist = "the recipe does not exist"
const sensitives = {'gluten': glutenIngredients,
                    'dairy': dairyIngredients,
                    'exclude':[]
                    }

module.exports.consts = {RECIPES_API, dairyIngredients, glutenIngredients, noRecipesFoundMess, recipeDoesnotExist, sensitives}