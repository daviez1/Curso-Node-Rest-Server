const { response, request } = require('express')

const usuariosGet =  function (req = request, res = response) {
    const { id } = req.params
    const { apellido, raza = 'Blanco' } =  req.query
    res.json(
        {msg: 'Get API',
        id,
        apellido,
        raza
    })
}

const usuariosPost =  function (req = request, res = response) {
    const body = req.body;
    res.json(
        {msg: 'Post API',
        body
    })
}

const usuariosPut =  function (req = request, res = response) {
    const { id } = req.params
    const { apellido, raza = 'Blanco' } =  req.query
    res.json(
        {msg: 'Put API',
        id,
        apellido,
        raza
    })
}

const usuariosDelete =  function (req = request, res = response) {
    res.json(
        {msg: 'Delete API'
    })
}

module.exports = { usuariosGet, usuariosDelete, usuariosPost, usuariosPut }