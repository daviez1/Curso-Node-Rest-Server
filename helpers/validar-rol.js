const Role = require('../models/rol')
const Usuario = require('../models/usuarios');


const validarRole = async (rol = '') =>{
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe`)
    }
}

const existeUsuarioPorID = async( id )=>{

    const existeUsuario = await Usuario.findById( id )
    if( !existeUsuario ) {
         throw new Error(`El usuario con id ${id} no existe`)
    }
}

module.exports = {
    validarRole,
    existeUsuarioPorID
}