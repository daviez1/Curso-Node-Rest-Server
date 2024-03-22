const { response, request } = require('express');
const Servicio = require('../models/servicios');


const obtenerServicios = async(req = request, res = response)=>{
    const servicios = await Servicio.find()
    // .skip(0)
    // .limit(2)

    if(!servicios) {
        return res.status(400).json({
            msg: "No existen servicios en la DB"
        })
    }

    res.status(200).json({
        servicios
    })
}

const obtenerServicioPorId = async(req = request, res = response)=>{
    const { id } = req.params
    const servicio = await Servicio.findById(id)

    if(!servicio) {
        return res.status(400).json({
            msg: "No existe el servicio indicado en la DB"
        })
    }
    
    res.status(200).json({
        servicio
    })
}


const ServicioPost = async(req = request, res = response)=> {
   
    const { tipo , descripcion } = req.body;
    const existeServicio = await Servicio.findOne({ descripcion })
    
    if(existeServicio){
        return res.json({
            msg: `Ya existe ese servicio`
        })
    }

    const servicio = new Servicio( { tipo , descripcion } )

   res.json(
       {msg: 'Post API',
       servicio
   })
   await servicio.save();
}

const deleteServicio = async( req = request, res = response) =>{
    const { id } = req.params

    const servicio = await Servicio.findByIdAndUpdate( id, {estado: false} )

    if(!servicio) {
        return res.status(400).json({
            msg: "No existe el servicio indicado en la DB"
        })
    }

    if(!servicio) res.status(400).json('El evento indicado no existe')
    return res.status(200).json({
        servicio
    })
}

const serviciosPut = async function (req = request, res = response) {
    const { id } = req.params
    const {_id, ...resto} = req.body
    
    const servicio = await Servicio.findByIdAndUpdate(id, resto);

    if(!servicio){
        return res.status(400).json({
            msg: "No existe el servicio indicado"
        })
    }

    res.json(
        {msg: 'Put API',
        servicio
    })
}


module.exports = { 
    obtenerServicios,
    ServicioPost,
    obtenerServicioPorId,
    serviciosPut,
    deleteServicio
}