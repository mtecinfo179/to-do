const { Router } = require('express')
const { database } = require('./infra/database/inMemory/dados')

const routes = Router()

routes.get('/todos', (request, response) => {
    return response.json(database)
})

module.exports = routes