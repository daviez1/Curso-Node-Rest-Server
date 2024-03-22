const { Router, response } = require('express')
const { check } = require('express-validator')

const { 
    EventoPost, 
    obtenerEventoPorId, 
    obtenerEventos, 
    deleteEventos, 
    eventosPut } = require('../controller/eventos')
const validarDatos = require('../middlewares/validar-datos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { esAdminRole } = require('../middlewares/validar-por-rol')

const router = Router()

router.get('/', obtenerEventos)

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    validarDatos
],obtenerEventoPorId)

router.post('/', [
    validarJWT,
    esAdminRole,
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('adultos', 'La cantidad de adultos es obligatoria').not().isEmpty(),
    check('ninios', 'La cantidad de niños es obligatoria').not().isEmpty(),
    check('costo', 'El costo es obligatorio').not().isEmpty(),
    validarDatos
],EventoPost)

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    validarDatos
],eventosPut)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    validarDatos
],deleteEventos)


module.exports = router