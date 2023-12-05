const { Router } = require('express')
const { getPokemonsHandler, getPokemonIdHandler, createPokemonHandler } = require('../handlers/pokemonsHandler')

const pokemonsRouter = Router()

pokemonsRouter.get('/', getPokemonsHandler)
pokemonsRouter.get('/:id', getPokemonIdHandler)
pokemonsRouter.post('/', createPokemonHandler)

module.exports = pokemonsRouter