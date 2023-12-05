const { Types } = require('../db.js')
const axios = require('axios')

const getTypes = async () => {
    let typesDB = await Types.findAll()
    let names = []
    if(!typesDB.length){
        for( let i = 1; i < 19; i++){
            let petition = (await axios(`https://pokeapi.co/api/v2/type/${i}`)).data
            names.push(petition.name)
        }
        for( let i = 0; i < names.length; i++){
            await Types.create({
                name: names[i] 
            })
        }
        typesDB = await Types.findAll()
        return typesDB
    }
    return typesDB
}

module.exports = {
    getTypes
}