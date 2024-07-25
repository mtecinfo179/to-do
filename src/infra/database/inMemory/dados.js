const { STATUS } = require('../../../const/status')

const database = [
    {
        id: 'qualquer-um',
        titulo: 'Des. API de Consulta',
        responsavel: 'vocês',
        status: STATUS.FAZER,
        dataCriacao: new Date(),
        dataLimite: new Date('2024-02-22'),
        dataConclusao: null
    },
    {
        id: 'qualquer-dois',
        titulo: 'Des. API de Consulta',
        responsavel: 'vocês',
        status: STATUS.FAZENDO,
        dataCriacao: new Date(),
        dataLimite: new Date('2024-02-22'),
        dataConclusao: null
    }
]

module.exports = {
    database
}