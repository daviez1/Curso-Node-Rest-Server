const path = require('path');
const fs   = require('fs');

// const cloudinary = require('cloudinary').v2
// cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');

const Habitacion = require('../models/habitaciones');
const Evento = require('../models/eventos');
const Paquete = require('../models/paquetes');
const Servicio = require('../models/servicios');

const cargarArchivo = async(req, res = response) => {


    try {
        
        // txt, md
        // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const actualizarImagen = async(req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'habitaciones':
            modelo = await Habitacion.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe una habitación con el id ${ id }`
                });
            }
        
        break;

        case 'paquetes':
            modelo = await Paquete.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un paquete con el id ${ id }`
                });
            }
        
        break;
    
        case 'servicios':
            modelo = await Servicio.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un servicios con el id ${ id }`
                });
            }
        
        break;
        
        case 'evento':
            modelo = await Evento.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un evento con el id ${ id }`
                });
            }
        
        break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }


    // Limpiar imágenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor .fs:FileSystem
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }


    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();


    res.json( modelo );

}

const mostrarImagen = async(req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'habitaciones':
            modelo = await Habitacion.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe una habitación con el id ${ id }`
                });
            }
        
        break;

        case 'paquetes':
            modelo = await Paquete.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un paquete con el id ${ id }`
                });
            }
        
        break;
    
        case 'servicios':
            modelo = await Servicio.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un servicios con el id ${ id }`
                });
            }
        
        break;
        
        case 'evento':
            modelo = await Evento.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un evento con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }


    // Limpiar imágenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen )
        }
    }


    //Para que mande el no img
    const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathImagen );
}

const actualizarImagenCloudinary = async(req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'habitaciones':
            modelo = await Habitacion.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe una habitación con el id ${ id }`
                });
            }
        
        break;

        case 'paquetes':
            modelo = await Paquete.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un paquete con el id ${ id }`
                });
            }
        
        break;
    
        case 'servicios':
            modelo = await Servicio.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un servicios con el id ${ id }`
                });
            }
        
        break;
        
        case 'evento':
            modelo = await Evento.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un evento con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }


    // Limpiar imágenes previas
    if ( modelo.img ) {
        const nombreArr = modelo.img.split('/');
        const nombre    = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }


    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    modelo.img = secure_url;

    await modelo.save();


    res.json( modelo );

}






module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}