const { getTypes } = require('../controllers/typesController')

const getTypesHandler = async (req, res) => {
    try {
        // console.log('sapito')
        const response = await getTypes()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getTypesHandler
}