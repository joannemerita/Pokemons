const { Pokemons } = require('../db.js')
const { Types } = require('../db.js')
const axios = require('axios')

// Brings ALL pokemons, accepts name by query
const getPokemons = async (name) => {
    const pokemonsDB = await getPokemonsDB()
    const pokemonsAPI = await getPokemonsAPI()
    const allPokemons = [...pokemonsDB, ...pokemonsAPI]

    if(name){
        const pokemonsFound = allPokemons.filter(poke => poke.name.toLowerCase().includes(name.toLowerCase()))
        return pokemonsFound
    }
    return allPokemons
}

// Brings all pokemons from the database
const getPokemonsDB = async () => {
    const pokemonDB = await Pokemons.findAll()
    return pokemonDB
}

// Brings all pokemons from the api
const getPokemonsAPI = async () => {

    let pokemons = []

    for( let i = 1; i < 41; i++){
        let api = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`)
        pokemons.push(api)
    }
    pokemons = (await Promise.all(pokemons)).map(res => {
        const pokemon = res.data
        // const types = pokemon.types.map(obj => obj.type.name)
        return({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default,
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            types: pokemon.types.map(obj => obj.type.name)
        })
    })
    let allPokemons = []
    pokemons.map(poke => {
        allPokemons = allPokemons.concat(poke)
    })
    return pokemons
}

// Brings a pokemon by id
const getPokemonId = async (id) => {
    if(isNaN(id)) {
        const pokemonFound = await Pokemons.findByPk(id) 
        return pokemonFound
    }
    const pokemonFound = (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)).data

    const pokemon = {
        id: pokemonFound.id,
        name: pokemonFound.name,
        image: pokemonFound.sprites.front_default,
        hp: pokemonFound.stats[0].base_stat,
        attack: pokemonFound.stats[1].base_stat,
        defense: pokemonFound.stats[2].base_stat,
        types: pokemonFound.types.map(obj => obj.type.name)
    }
    return pokemon
}

// Creates a pokemon
const createPokemon = async (name, image, hp, attack, defense, types) => {
    if(!name || !image || !hp || !attack || !defense || !types){
        throw new Error('There is a missing value')
    }
    const newPokemon = await Pokemons.create({
        name,
        image,
        hp,
        attack,
        defense
        // types
    })

    // return newPokemon

    const foundTypes = []

    const typesDB = await Types.findAll();
    types.map(name => typesDB.map(x => x.name == name ? foundTypes.push(x) : false))

    for( let i = 0; i < foundTypes.length; i++){
        await newPokemon.addTypes(foundTypes[i].id)
    }
    const thisPokemon = await Pokemons.findAll({
        where: {
            name: name
        },
        include: [
            {
                model: Types,
                as: 'Types',
                attributes: ['name'],
                through: {attributes: []}
            }
        ]
    })
    return thisPokemon
}

module.exports = {
    getPokemons,
    getPokemonId,
    createPokemon
}