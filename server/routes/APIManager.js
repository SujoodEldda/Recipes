// const consts = require('./config')
// const RECIPES_API = consts.RECIPES_API

class APIManager {
    
    constructor() {
        this.data = []
    }

    fetch(url) {
        return $.get(url)
    }

    getRecipesAPI(ingredient){
        return this.fetch(RECIPES_API+ingredient)
    }

    promising(ingredient, render){
        getRecipesAPI(ingredient).then((Data)=>{
            let [quoteData, meatData, pokemonData, allUsers] = Data
            let [userData, ...friendsData] = allUsers.results
            let Allfriends = []
            friendsData.forEach(friend=> {Allfriends.push({name: friend.name.first+" "+friend.name.last})})
            currentPage.friends = Allfriends
            currentPage.setAllAtOnce(userData.name.first, userData.name.last, userData.location.city,
                userData.location.country, quoteData.quote, meatData[0], (pokemonData.name).charAt(0).toUpperCase() + (pokemonData.name).slice(1),
                Allfriends, pokemonData.sprites.front_default, userData.picture.medium)
        })
        render.Render(this.currentPage)
    }
}

module.exports.APIManager = APIManager