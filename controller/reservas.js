const { response, request } = require('express');
const Reserva = require('../models/reservas');
const { Usuario } = require('../models');

const obtenerReservas = async(req = request, res = response)=>{
    const reservas = await Reserva.find({})
    
    if(!reservas) {
        return res.status(400).json({
            msg: "No existen reservas en la DB"
        })
    }

    res.status(200).json({
        reservas
    })
}

const obtenerReservaPorNombre = async(req = request, res = response)=>{
    
    const { nombre } = req.params
    const reserva = await Reserva.find({ nombre })

    if(!reserva || reserva.length == 0) {
        return res.status(400).json({
            msg: `No existen reservas del usuario con email ${ nombre } en la DB`
        })
    }

    res.status(200).json({
        reserva
    })
}

const ReservaPost = async(req = request, res = response)=> {
   
   try {
    const { fecha, nombre, adultos, ninios, costo, descripcion, tipo } = req.body;
    
    
    const usuario = await Usuario.findById( req.usuario._id )
    
    const data =  {
        descripcion, nombre ,
        tipo: tipo.toUpperCase(),
        fecha, adultos, 
        ninios, costo,
        correo: usuario.correo
        }
        
        const reserva = new Reserva( data )

        await reserva.save();
        
        return res.status(200).json(
        {
            msg: `La reserva a nombre de ${data.nombre} ha sido creada con éxito`,
            reserva
        })
            
}
   catch( error ){
    res.status(500).json(
        `Ha existido un error`
    )
    console.log(error);
   }
}

const deleteReserva = async( req = request, res = response) =>{
    const { id } = req.params

    const reserva = await Reserva.findByIdAndUpdate(  id , {estado: false} )

    if(!reserva) {
        return res.status(400).json({
            msg: `No existen reservas de ese usuario en la DB`
        })
    }
    
    return res.status(200).json({
        reserva
    })
}

const reservasPut = async function (req = request, res = response) {
    const { id } = req.params
    const {_id, ...resto} = req.body
    
    const reserva = await Reserva.findByIdAndUpdate(id, resto);

    if(!reserva) {
        return res.status(400).json({
            msg: "No existe la reserva indicado en la DB"
        })
    }

    res.json(
        {msg: 'Put API',
        reserva
    })
}

module.exports = {
    reservasPut,
    ReservaPost,
    deleteReserva,
    obtenerReservaPorNombre,
    obtenerReservas
}