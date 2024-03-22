const { Router, response } = require('express')
const { check } = require('express-validator')

const Habitacion = require('../models/habitaciones')
const { HabitacionPost, 
    obtenerHabitaciones, 
    obtenerHabitacionPorId, 
    deleteHabitaciones, 
    habitacionesPut, 
    obtenerHabitacionPorNumero} = require('../controller/habitaciones')

const validarDatos = require('../middlewares/validar-datos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { esAdminRole } = require('../middlewares/validar-por-rol')

const router = Router()

router.get('/', obtenerHabitaciones)

// router.get('/:id',[
//     check('id', 'No es un id válido').isMongoId(),
//     validarDatos
// ], obtenerHabitacionPorId)

router.get('/:numero', obtenerHabitacionPorNumero)

router.post('/', [
    validarJWT,
    esAdminRole,
    check('numero', 'El numero es obligatorio').not().isEmpty(),
    check('piso', 'El piso es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('disponibilidad', 'La definicion de la disponibilidad es obligatoria').not().isEmpty(),
    check('costo', 'El costo es obligatorio').not().isEmpty(),
    validarDatos
],HabitacionPost)

router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('numero', 'El numero es obligatorio').not().isEmpty(),
    check('piso', 'El piso es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('disponibilidad', 'La definicion de la disponibilidad es obligatoria').not().isEmpty(),
    check('costo', 'El costo es obligatorio').not().isEmpty(),
    validarDatos
], habitacionesPut)

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    validarDatos
], deleteHabitaciones)



module.exports = router