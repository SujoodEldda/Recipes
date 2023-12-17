$("#filter-recipes").on("click",function(){
    $(".recipes").empty()
    const input = $("#ingredient-input").val()
    const glutenCheckBox = $("#gluten")
    const diaryCheckBox = $("#diary")
   
    $.get(`recipes/${input}/${glutenCheckBox.prop('checked')}/${diaryCheckBox.prop('checked')}`,function(data){
        if(data[0]!=undefined){

            for(let recipe of data){
    
                let source = $(`#recipe-template`).html()
                let template = Handlebars.compile(source)
                let HTMLToAdd = template(recipe)
                $(`.recipes`).append(HTMLToAdd)
            }
        }
        else{
            alert("no recipes found!")
        }
    })
    
})

$(".recipes").on("click",".recipe", function(){
    let id = $(this).closest("div").attr('id')
    $.get(`ingredient/${id}`,function(data){
        alert(JSON.stringify(data))
    })
})