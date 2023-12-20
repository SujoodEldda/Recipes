const render = new Renderer()

const getData = function(input, inputExclude){
    $.get(`recipes/${input}/${glutenCheckBox.prop('checked')}/${diaryCheckBox.prop('checked')}/${inputExclude}`,function(data){
        if(data[0]){
            render.renderRecipes(data)
        }
        
        else{
            alert(noRecipesFoundMess)
        }
    })
} 

filterRecipes.on("click",function(){
    const input = ingredientInput.val()
    let inputExclude = excludeInput.val()
    if(inputExclude == ''){
        inputExclude = 'false'
    }
    recipesContainer.empty()
    getData(input,inputExclude)
    
})


recipesContainer.on("click",".recipe", function(){
    let id = $(this).closest("div").attr('id')
    $.get(`ingredient/${id}`,function(data){
        alert(JSON.stringify(data))
    })
})

recipesContainer.on("click",".like", function(){
    let id = $(this).closest("div").attr('id')
    let data = { id }
    $.post(`favorite`, data, function (response) {
        console.log("POST complete")
    })
})

const getFavorite = function(){
    recipesContainer.empty()
    
    $.get('favorite',function(data){
        if(data[0]){
            
            render.renderRecipes(data)
        }
        
        else{
            alert(noRecipesFoundMess)
        }
    })
}


