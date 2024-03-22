const { response, request } = require('express');
const Habitacion = require('../models/habitaciones');

const obtenerHabitaciones = async(req = request, res = response)=>{
    const habitaciones = await Habitacion.find()
    .skip(1)
    .limit(2)

    if(!habitaciones) {
        return res.status(400).json({
            msg: "No existen habitaciones en la DB"
        })
    }

    res.status(200).json({
        habitaciones
    })
}

const obtenerHabitacionPorId = async(req = request, res = response)=>{
    const { id } = req.params
    const habitacion = await Habitacion.findById(id)

    if(!habitacion) {
        return res.status(400).json({
            msg: "No existe la habitacion indicada en la DB"
        })
    }
    if(!habitacion.estado) res.status(400).json('La habitacion indicada ha sido eliminada')

    res.status(200).json({
        habitacion
    })
}

const obtenerHabitacionPorNumero = async(req = request, res = response)=>{
    const { numero } = req.params
    const habitacion = await Habitacion.find( {numero} )

    if(!habitacion) {
        return res.status(400).json({
            msg: "No existe la habitacion indicada en la DB"
        })
    }
    if( habitacion.estado === false ) return res.status(400).json('La habitacion indicada ha sido eliminada')

    res.status(200).json({
        habitacion
    })
}

const HabitacionPost = async(req = request, res = response)=> {
   
    const {numero, tipo, piso, disponibilidad, costo} = req.body;
    const existeHabitacion = await Habitacion.findOne({ numero })
    
    if(existeHabitacion){
        return res.json({
            msg: "Ya existe la habitacion"
        })
    }

    const habitacion = new Habitacion( {numero, tipo, piso, disponibilidad, costo} )

   res.json(
       {msg: 'Post API',
       habitacion
   })
   await habitacion.save();
}

const deleteHabitaciones = async( req = request, res = response) =>{
    const { id } = req.params

    const habitacion = await Habitacion.findByIdAndUpdate( id, {estado: false} )
    
    if(!habitacion) res.status(400).json('La habitacion no existe')
    return res.status(200).json({
        habitacion
    })
}

const habitacionesPut = async function (req = request, res = response) {
    const { id } = req.params
    const {_id, ...resto} = req.body
    
    const habitacion = await Habitacion.findByIdAndUpdate(id, resto);

    if(!habitacion) {
        return res.status(400).json({
            msg: "No existe la habitacion indicada en la DB"
        })
    }

    res.json(
        {msg: 'Put API',
        habitacion
    })
}

module.exports = {
    HabitacionPost,
    obtenerHabitaciones, 
    obtenerHabitacionPorId,
    obtenerHabitacionPorNumero, 
    deleteHabitaciones,
    habitacionesPut
}