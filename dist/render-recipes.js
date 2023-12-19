class Renderer {
    constructor(){

    }
    renderRecipes(data){
        for(let recipe of data){

            let source = recipeTemplate.html()
            let template = Handlebars.compile(source)
            let HTMLToAdd = template(recipe)
            recipesContainer.append(HTMLToAdd)
        }
        
    }
    
}