const { response, request } = require('express');
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/generarJWT');

const login = async(req = request, res = response)=> {

    const { correo, password } = req.body
    
    try {

        //Validar que el correo existe
        const usuario = await Usuario.findOne( {correo} )
        
        if (!usuario) {
            return res.status(400).json({
                msg:'Correo / Contrasena no son correctos -Correo'
            })
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg:'Correo / Contrasena no son correctos -Estado: false'
            })
        }
        //Validar que la contrasena existe
        const contrasenaExiste = bcryptjs.compareSync(password, usuario.password)
        if(!contrasenaExiste){
            return res.status(400).json({
                msg:'Correo / Contrasena no son correctos -Contrasena'
            })
        }

        //Generar JWT
        const token = await generarJWT( usuario.id )

        res.json(
            {
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json('Hable con el admin')
    }

}

// const usuariosPut = async function (req = request, res = response) {
   
//     res.json(
//         {msg: 'Put API',    })
// }

// const usuariosDelete = async function (req = request, res = response) {
//     res.json(
//         {msg: 'Delete API',
//     })
// }

module.exports = { login }