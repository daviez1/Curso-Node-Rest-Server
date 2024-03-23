const { Router } = require('express');
const { check } = require('express-validator');

const validarDatos = require('../middlewares/validar-datos')

const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controller/uploads');
const { coleccionesPermitidas } = require('../helpers/dbValidator');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');


const router = Router();


router.post( '/', validarArchivoSubir, cargarArchivo );

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['eventos','habitaciones','paquetes','servicios'] ) ),
    validarDatos
// ], actualizarImagenCloudinary )
], actualizarImagen )

router.get('/:coleccion/:id', [
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['eventos','habitaciones','paquetes','servicios'] ) ),
    validarDatos
], mostrarImagen  )



module.exports = router;