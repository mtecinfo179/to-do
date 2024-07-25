const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { database } = require('./infra/database/inMemory/dados')
const { STATUS, statusDisponiveis } = require('./const/status')
const routes = require('./routes')
const app = express()

app.use(express.json())
app.use(routes)

app.get('/todos/status', (request, response) => {
    const fazer = database.filter(todo => todo.status === STATUS.FAZER)
    const fazendo = database.filter(todo => todo.status === STATUS.FAZENDO)
    const feito = database.filter(todo => todo.status === STATUS.FEITO)

    return response.json({
        fazer,
        fazendo,
        feito
    })
})

app.get('/todo/:id', (request, response) => {
    const { id } = request.params
    const todo = database.find(todo => todo.id === id)
    return response.json(todo)
})

app.get('/todo/status/:status', (request, response) => {
    const { status } = request.params
    const statusValido = statusDisponiveis.includes(status.toLowerCase())
    if (!statusValido) {
        return response.status(400).json({
            message: 
            'Status inválido',
            success: false
        })
    }
    const todos = database.filter(todo => todo.status === status)
    if (todos.length === 0) {
        return response.status(404).json({
            message: 
            'Não existem TO-DOs com este status na base',
            success: false
        })
    }
    return response.json(todos)
})

app.post('/todo', (request, response) => {
    const dados = request.body
    console.log('dados', dados)
    const { titulo, responsavel, dataLimite } = dados
    if (!titulo || !responsavel || !dataLimite) {
        return response.status(400).json({
            message: 
            'Os parâmetros título, responsável e data limite são obrigatórios',
            success: false
        })
    }
    const todo = {
        id: uuidv4(),
        titulo,
        responsavel,
        status: STATUS.FAZER,
        dataCriacao: new Date(),
        dataLimite: new Date(dataLimite),
        dataConclusao: null
    }
    database.push(todo)
    return response.status(201).json()
})

app.patch('/todo/:id/status/:status', (request, response) => {
    const { id, status } = request.params
    const indiceTodoEncontrado = _recuperaIndexDaBase(id)
    if (indiceTodoEncontrado === -1) {
        return response.status(404).json({
            message: 'Nenhum todo encontrado com este id'
        })
    }
    database[indiceTodoEncontrado].status = status
    console.log('todo atualizado', 
        database[indiceTodoEncontrado])
    return response.json()
})

app.patch('/todo/:id/responsavel/:responsavel', (request, response) => {
    const { id, responsavel } = request.params
    const indiceTodoEncontrado = _recuperaIndexDaBase(id)
    if (indiceTodoEncontrado === -1) {
        return response.status(404).json({
            message: 'Nenhum todo encontrado com este id'
        })
    }
    database[indiceTodoEncontrado].responsavel = responsavel
    console.log('todo atualizado', 
    database[indiceTodoEncontrado])
    return response.json()
})

app.patch('/todo/:id/data-conclusao/:dataConclusao', (request, response) => {
    const { id, dataConclusao } = request.params
    const indiceTodoEncontrado = _recuperaIndexDaBase(id)
    if (indiceTodoEncontrado === -1) {
        return response.status(404).json({
            message: 'Nenhum todo encontrado com este id'
        })
    }
    database[indiceTodoEncontrado].dataConclusao = new Date(dataConclusao)
    console.log('todo atualizado', 
    database[indiceTodoEncontrado])
    return response.json()
})

function _recuperaIndexDaBase (id) {
    const indiceTodoEncontrado = database.findIndex(
        (todo) => todo.id === id
    )
    console.log('indiceTodoEncontrado', indiceTodoEncontrado)
    return indiceTodoEncontrado === -1 ? null : indiceTodoEncontrado
}

module.exports = {
    app
}