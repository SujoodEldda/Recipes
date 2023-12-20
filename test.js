const {consts} = require('./config')
const sensitives = consts.sensitives

const containSensitivity = function(sensitive, recipe){
    for( let ingredient of recipe.ingredients){
        if(sensitives[sensitive].includes(ingredient)){
          return true
        }
    }
    return false
}

//   const filterRecipesByAllergies2 = function(sensitivesArr){
//     const filteredRecipes = recipes.filter((recipe)=> !containSensitivity(sensitives.dairy,recipe) )
//     console.log(filteredRecipes)
//   }
let filteredRecipes = []
const filterRecipesByAllergies2 = function(sensitivesArr){
    for(let sensitive of sensitivesArr){
        recipes = recipes.filter((recipe)=> !containSensitivity(sensitive,recipe) )
    }
    console.log(recipes)
}
let exclude = 'Shakshuka'
let sensitivesArr = []
if(exclude!='false')
    sensitives['exclude'].push(exclude)
let req = { gluten: 'false', dairy: 'false', exclude: 'false' }
for(let sensitive of Object.keys(req))
{
    if(req[sensitive]!=false)
    {
        sensitivesArr.push(sensitive)
    }
}

let recipes = [{
    ingredients: ["Flour","Bread"]
},{
    ingredients: ["Bread","Butter"]
},{
    ingredients: ["Milk"]
},{
    ingredients : ["Shakshuka"]
}]

// console.log(sensitivesArr)
filterRecipesByAllergies2(sensitivesArr)
// filterRecipesByAllergies2(sensitivesArr)


// const filteredRecipes = recipes.filter((recipe)=> !containSensitivity(sensitives.dairy,recipe) )
// console.log(filteredRecipes)


// console.log(filterRecipesByAllergies2([sensitives.diary]))