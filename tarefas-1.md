baseUrl/recurso
baseUrl = o domínio da app, ex: viacep.com.br/ws
recurso = /:cep/json

## REQUISITOS FUNCIONAIS ##
# [X] DEVE SER POSSÍVEL REGISTRAR UM NOVO TODO
# [X] CADA TODO DEVE SEGUIR O SEGUINTE FORMATO:
    {
        id: string,
        titulo: string,
        responsavel: string
        status: string
        dataCriacao: Date,
        dataLimite: Date,
        dataConclusao: Date
    }

# [X] DEVE SER POSSÍVEL RECUPERAR A LISTA DE TODOS

## REQUISITOS NÃO FUNCIONAIS ##
# [X] O PROJETO DEVE SER INICIALIZADO UTILIZANDO ARRAYS COMO BASE DE DADOS

