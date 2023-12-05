const { getPokemons, getPokemonId, createPokemon } = require('../controllers/pokemonsController')

const getPokemonsHandler = async (req, res) => {
    try {
        const { name } = req.query
        const response = await getPokemons(name)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getPokemonIdHandler = async (req, res) => {
    try {
        const { id } = req.params
        const pokemon = await getPokemonId(id)
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createPokemonHandler = async (req, res) => {
    try {
        const {
            name,
            image,
            hp,
            attack,
            defense,
            types
        } = req.body
        const response = await createPokemon(
            name,
            image,
            hp,
            attack,
            defense,
            types
        )
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getPokemonsHandler,
    getPokemonIdHandler,
    createPokemonHandler
}