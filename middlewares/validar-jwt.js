const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuarios');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status(401).json({
                usuario,
                msg: 'El usuario no existe - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        if ( !(usuario.estado) ) {
            return res.status(401).json({
                usuario,
                msg: 'El usuario no existe - usuario con estado: false'
            })
        }
        
        
        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}



module.exports = {
    validarJWT
}


// const {response, request} = require('express')
// const jwt = require('jsonwebtoken')

// const Usuario = require('../models/usuarios')

// const validarJWT = async(req = request, res=response, next)=>{
//     const token = await req.header('x-token')

//     if (!token) {
//         return res.status(401).json({
//             msg:'La peticion no tiene token'
//         })
//     }

//     // console.log(token);

//     try {
//         const { uid } = jwt.verify(token, '3st3e51pr1Va7')

//         const usuario = await Usuario.findById( uid )

//         //Verificar si el usuario existe en DB
//         if( !usuario ){
//             res.status(401).json({
//                 msg: "El usuario no existe"
//             })
//         }

//         //Verificar si el uid tiene el estado en false
//         if( !usuario.estado ){
//             res.status(401).json({
//                 msg: "El usuario ha sido eliminado"
//             })
//         }

//         req.uid = usuario

//         req.uid = uid
//         console.log(`uid: ${uid}`);
//         next()
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({
//             msg: 'El token no es valido'
//         })
//     }

// }