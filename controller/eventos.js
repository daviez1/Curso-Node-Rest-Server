const { response, request } = require('express');
const moment = require('moment')

const Evento = require('../models/eventos');
const isValidDate = require('../helpers/validar-formato-fecha');


const obtenerEventos = async(req = request, res = response)=>{
    const eventos = await Evento.find()
    
    if(!eventos) {
        return res.status(400).json({
            msg: "No existen eventos en la DB"
        })
    }

    res.status(200).json({
        eventos
    })
}

const obtenerEventoPorId = async(req = request, res = response)=>{
    const { id } = req.params
    const evento = await Evento.findById(id)

    if(!evento) {
        return res.status(400).json({
            msg: "No existe el evento indicado en la DB"
        })
    }
    if(!evento.estado) return res.status(400).json('El evento indicado ha sido eliminado')

    res.status(200).json({
        evento
    })
}

const EventoPost = async(req = request, res = response)=> {
   
    const { fecha, nombre, adultos, ninios, costo, descripcion } = req.body;
    
    // if(!isValidDate(fecha)) return res.status(400).json('La fecha no es valida; formato valido: /año-mes-dia/')

    const evento = new Evento( {fecha, nombre, adultos, ninios, costo, descripcion} )

   res.json(
       {msg: 'Post API',
       evento
   })
   await evento.save();
}

// const EventoPost = async (req = request, res = response) => {
//     try {
//         const { fecha, nombre, adultos, ninios, costo, descripcion } = req.body;

//         // Busca un evento con el mismo nombre
//         const existeEvento = await Evento.findOne({ nombre });
//         if (existeEvento) {
//             // Convierte la fecha ingresada a un objeto Date (asumiendo el formato "DD-MM-YY")
//             const fechaFormateada = moment(fecha, "DD-MM-YY").toDate();

//             // Compara las fechas
//             if (fechaFormateada.getTime() === existeEvento.fecha.getTime()) {
//                 return res.json({
//                     msg: `Ya existe el evento ${nombre}`,
//                 });
//             }
//         }

//         // Crea un nuevo evento
//         const evento = new Evento({
//             fecha,
//             nombre,
//             adultos,
//             ninios,
//             costo,
//             descripcion,
//         });

//         // Guarda el evento en la base de datos
//         await evento.save();

//         res.json({
//             msg: "Evento creado exitosamente",
//             evento,
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({
//             msg: "Error al crear el evento",
//         });
//     }
// };


const deleteEventos = async( req = request, res = response) =>{
    const { id } = req.params

    // await Evento.findByIdAndUpdate( id, {estado: false} )
    // const evento = await Evento.find({estado: true})

    const evento = await Evento.findByIdAndUpdate( id, {estado: false} )

    if(!evento) return res.status(400).json('El evento indicado no existe')
    if(!evento.estado) return res.status(400).json('El evento indicado ya ha sido eliminado')

    return res.status(200).json({
        evento
    })
}

const eventosPut = async function (req = request, res = response) {
    const { id } = req.params
    const {_id, nombre, ...resto} = req.body
    
    const evento = await Evento.findByIdAndUpdate(id, resto);

    if(!evento) {
        return res.status(400).json({
            msg: `No existe el evento indicado`
        })
    }
    if(!evento.estado) return res.status(400).json('El evento indicado ha sido eliminado')

    res.json(
        {msg: 'Put API',
        evento
    })
}

module.exports = {
    EventoPost,
    eventosPut,
    deleteEventos,
    obtenerEventoPorId,
    obtenerEventos
}