const { response, request } = require('express');
const Paquete = require('../models/paquetes');


const obtenerPaquetes = async(req = request, res = response)=>{
    const paquetes = await Paquete.find({})
    // .skip(0)
    // .limit(2)

    if(!paquetes) {
        return res.status(400).json({
            msg: "No existen paquetes en la DB"
        })
    }

    res.status(200).json({
        paquetes
    })
}

const obtenerPaquetePorId = async(req = request, res = response)=>{
    const { id } = req.params
    const paquete = await Paquete.findById(id)

    if(!paquete) {
        return res.status(400).json({
            msg: "No existe el paquete indicado en la DB"
        })
    }

    res.status(200).json({
        paquete
    })
}

const PaquetePost = async(req = request, res = response)=> {
   
    const { fecha, nombre, adultos, ninios, costo, descripcion } = req.body;
    const existePaquete = await Paquete.findOne({ nombre })
    
    if(existePaquete){
        return res.status(400).json({
            msg: `Ya existe el paquete ${ nombre }`
        })
    }

    const paquete = new Paquete( {fecha, nombre, adultos, ninios, costo, descripcion} )

   res.json(
       {msg: 'Post API',
       paquete
   })
   await paquete.save();
}

const deletePaquete = async( req = request, res = response) =>{
    const { id } = req.params

    // await Paquete.findByIdAndUpdate( id, {estado: false} )
    // const paquete = await Paquete.find({estado: true})

    const paquete = await Paquete.findByIdAndUpdate( id, {estado: false} )

    if(!paquete) res.status(400).json('El evento indicado no existe')
    return res.status(200).json({
        paquete
    })
}

const paquetesPut = async function (req = request, res = response) {
    const { id } = req.params
    const {_id, ...resto} = req.body
    
    const paquete = await Paquete.findByIdAndUpdate(id, resto);

    if(!paquete) {
        return res.status(400).json({
            msg: "No existe el paquete indicado en la DB"
        })
    }

    res.json(
        {msg: 'Put API',
        paquete
    })
}

module.exports = {
    paquetesPut,
    PaquetePost,
    deletePaquete,
    obtenerPaquetePorId,
    obtenerPaquetes
}