const Valoracione = require('../models/valoraciones')
const { response, request } = require("express");

const valoracionesPost = async(req = request, res = response)=> {
   
    const { fecha, nombre, descripcion, correo } = req.body;
    
    const valoracion = new Valoracione ( {fecha, nombre, descripcion, correo} )
    
    res.status(200).json({
    msg: 'Gracias por valorarnos :)',
    valoracion
})

    await valoracion.save()
}

const valoracionesGet = async( req = request, res = response) =>{
    
    const valoraciones = await Valoracione.find()
    
    return res.status(400).json({
        valoraciones
    })
  
}

module.exports = {
    valoracionesPost,
    valoracionesGet
}





