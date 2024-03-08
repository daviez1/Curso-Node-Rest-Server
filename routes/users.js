const { Router } = require('express')
const { check } = require('express-validator')

const validarDatos = require('../middlewares/validar-datos')
const {validarRole, emailExiste, existeUsuarioPorID} = require('../helpers/validar-rol')

const router = Router()

const { usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut 
} = require('../controller/usuarios') 

// router.get('/api/usuarios', function (req, res) {
//     res.send('Hola')
// })
router.get('/', usuariosGet)

router.post('/',[
    check('correo', 'El correo no es valido').isEmail(),  //para negar check('correo', 'El correo no es valido').not().isEmail()
    check('correo').custom( emailExiste ),
    check('nombre','Ese nombre no es valido').not().isEmpty(),
    check('password','Esa contraseña no es valida').isLength({ min: 6 }),
    // check('rol','Ese rol no tiene acceso a la BD').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( validarRole ),
    validarDatos
] ,usuariosPost)

router.put('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    check('rol').custom( validarRole ),
    validarDatos
], usuariosPut)

router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarDatos
] ,usuariosDelete) 

router.patch('/', function (req, res) {
    res.json({
        msg: "GET API" 
    })
})   

router.get('/', function (req, res) {
    res.send('Hola')
  }) 

  module.exports = router