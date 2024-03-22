const { Router, response } = require('express')
const { check } = require('express-validator')

const  mostrarAgendados = require('../controller/mostrar-agendado')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.get('/',[
    validarJWT
], mostrarAgendados)

module.exports = router