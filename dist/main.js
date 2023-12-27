const render = new Renderer()
let page =0

const getData = function(input, inputExclude, gluten, dairy){
    $.get(`recipes/${input}/?gluten=${gluten}&dairy=${dairy}&exclude=${inputExclude}`,function(data){
        if(data[0]){
            page = 0
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
    let gluten = glutenCheckBox.prop('checked')
    let diary = diaryCheckBox.prop('checked')
    if(inputExclude == ''){
        inputExclude = 'false'
    }
    recipesContainer.empty()
    getData(input,inputExclude, gluten, diary)
    
})

const goToPage = function(){

    $.get(`pages/${page}`,function(data){
        if(data[0]){

            render.renderRecipes(data)
        }
        
        else{
            alert(doneWithTheRecipes)
        }
    })
}

const next = function(){
    page += 1
    goToPage()
    
}
const previous = function(){
    if(page-1 >= 0){
        page-=1
        goToPage()
    }
}

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
        console.log(PostMess)
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


