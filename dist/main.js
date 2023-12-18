
filterRecipes.on("click",function(){
    const input = ingredientInput.val()
    recipesContainer.empty()
    $.get(`recipes/${input}/${glutenCheckBox.prop('checked')}/${diaryCheckBox.prop('checked')}`,function(data){
        if(data[0]!=undefined){

            for(let recipe of data){
    
                let source = recipeTemplate.html()
                let template = Handlebars.compile(source)
                let HTMLToAdd = template(recipe)
                recipesContainer.append(HTMLToAdd)
            }
        }
        
        else{
            alert(noRecipesFoundMess)
        }
    })
    
})

recipesContainer.on("click",".recipe", function(){
    let id = $(this).closest("div").attr('id')
    $.get(`ingredient/${id}`,function(data){
        alert(JSON.stringify(data))
    })
})