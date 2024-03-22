const { Router } = require('express')
const { check } = require('express-validator')

const {validarRole, existeUsuarioPorID} = require('../helpers/validar-rol')

const validarDatos = require('../middlewares/validar-datos')
const { validarJWT } = require('../middlewares/validar-jwt')
// const { validarPorRol } = require('../middlewares/validar-por-rol')

const router = Router()

const { usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut, 
    obtenerUsuarioPorNombre
} = require('../controller/usuarios') 
const { esAdminRole } = require('../middlewares/validar-por-rol')

// router.get('/api/usuarios', function (req, res) {
//     res.send('Hola')
// })
router.get('/', [
    validarJWT,
    esAdminRole
],usuariosGet)

router.get('/:nombre', [
        validarJWT,
        esAdminRole
],obtenerUsuarioPorNombre)

router.post('/',[
    check('correo', 'El correo no es valido').isEmail(),  //para negar check('correo', 'El correo no es valido').not().isEmail()    
    check('nombre','Ese nombre no es valido').not().isEmpty(),
    check('password','La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
    check('rol').custom( validarRole ),
    validarDatos
] ,usuariosPost)

router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    check('rol').custom( validarRole ),
    validarDatos
], usuariosPut)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
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