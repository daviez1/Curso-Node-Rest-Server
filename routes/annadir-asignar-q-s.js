const { Router } = require("express");
const { check } = require('express-validator');
const {AtencionAlClientePost, asignarEstadoALaQuejaSugerencia, } = require("../controller/annadir-q-s");
const validarDatos = require("../middlewares/validar-datos");
const { esAdminRole } = require("../middlewares/validar-por-rol");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router()

router.post('/',[  
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarDatos
] , AtencionAlClientePost)

router.put('/:id',[  
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    // check('correo', 'El correo es obligatorio').not().isEmpty(),
    // check('correo', 'El correo no es valido').isEmail(),
    // check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarDatos
] , asignarEstadoALaQuejaSugerencia)

module.exports = router