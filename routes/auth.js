const { Router } = require('express')
const { check } = require('express-validator')

const { login } = require('../controller/auth')
const validarDatos = require('../middlewares/validar-datos')

const router = Router()

router.post('/login',[  
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    validarDatos
] , login)

module.exports = router