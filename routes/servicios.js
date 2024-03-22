const { Router, response } = require('express')
const { check } = require('express-validator')


const { obtenerServicios, ServicioPost, obtenerServicioPorId, deleteServicio, serviciosPut } = require('../controller/servicios')

const validarDatos = require('../middlewares/validar-datos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { esAdminRole } = require('../middlewares/validar-por-rol')

const router = Router()

router.get('/' ,obtenerServicios)

router.get('/:id', [   
    check('id', 'No es un id válido').isMongoId(),
    validarDatos
]
,obtenerServicioPorId)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    validarDatos
],deleteServicio)

router.post('/', [
    validarJWT,
    esAdminRole,
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarDatos
],ServicioPost)

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarDatos
],serviciosPut)


module.exports = router