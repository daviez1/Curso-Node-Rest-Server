const { Router } = require("express");
const { check } = require('express-validator');

const {valoracionesGet, valoracionesPost } = require("../controller/valoraciones");

const validarDatos = require("../middlewares/validar-datos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router()

router.post('/',[  
    validarJWT,
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarDatos
] , valoracionesPost)

router.get('/', valoracionesGet)

module.exports = router