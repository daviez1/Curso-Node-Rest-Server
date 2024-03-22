const { Router, response } = require('express')
const { check } = require('express-validator')

const {  PaquetePost,
    obtenerPaquetePorId,
    deletePaquete,
    paquetesPut, 
    obtenerPaquetes} = require('../controller/paquetes')
const validarDatos = require('../middlewares/validar-datos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { esAdminRole } = require('../middlewares/validar-por-rol')

const router = Router()

router.get('/', obtenerPaquetes)

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    validarDatos
], obtenerPaquetePorId)

router.post('/', [
    validarJWT,
    esAdminRole,
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('adultos', 'La cantidad de adultos es obligatoria').not().isEmpty(),
    check('ninios', 'La cantidad de niños es obligatoria').not().isEmpty(),
    check('costo', 'El costo es obligatorio').not().isEmpty(),
    validarDatos
],PaquetePost)

router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('adultos', 'La cantidad de adultos es obligatoria').not().isEmpty(),
    check('ninios', 'La cantidad de niños es obligatoria').not().isEmpty(),
    check('costo', 'El costo es obligatorio').not().isEmpty(),
    validarDatos
], paquetesPut)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    validarDatos
],deletePaquete)


module.exports = router