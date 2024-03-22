const { response, request } = require('express');
const {Reserva } = require('../models');

const mostrarAgendados = async (req = request, res = response) => {
    try {
        const usuario = req.usuario
        
        // // Busca todas las reservas
        const total = await Reserva.countDocuments( { estado: true } )
        const reservas  = await Reserva.find({ correo: usuario.correo })
        
        if (!reservas || reservas.length == 0)  {
            return res.status(400).json({
                msg: `No existen reservas de ${ usuario.nombre } en la DB`,
            });
        }
       
        return res.status(201).json({
            reservas,
            total
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            msg: "Error al obtener las reservas",
        });
    }
};

module.exports = mostrarAgendados 