const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../dbConeccion/config')

const app = express() 

class Server{

    constructor(){
        this.app = app;
        this.puerto = process.env.PORT
        this.PathUsuarios     = '/api/usuarios'
        this.AuthUsuarios     = '/api/auth'
        this.PathHabitaciones = '/api/habitaciones'
        this.PathEventos      = '/api/eventos'
        this.PathPaquetes     = '/api/paquetes'
        this.PathServicios    = '/api/servicios'
        this.PathAtencionCL   = '/api/AtencionAlCliente'
        this.PathReservas     = '/api/Reservas'
        this.PathReservas     = '/api/Reservas'
        this.PathValoraciones = '/api/Valoraciones'
        this.PathAgendados    =  '/api/Agendados'


        this.conectarDB()
        this.middlewares()
        this.routes()
    }

    //Conectar a Base de Datos
    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //Cors
        this.app.use(cors())
        
        //Lectura y parseo
        this.app.use( express.json() ) 

        //Directorio publico
        // this.app.use( express.static('public') )
    }

    routes(){
        this.app.use(this.AuthUsuarios, require('../routes/auth') )
        this.app.use(this.PathEventos, require('../routes/eventos') )
        this.app.use(this.PathHabitaciones, require('../routes/habitaciones') )
        this.app.use(this.PathUsuarios, require('../routes/users') )
        this.app.use(this.PathPaquetes, require('../routes/paquetes') )
        this.app.use(this.PathServicios, require('../routes/servicios') )
        this.app.use(this.PathAtencionCL, require('../routes/annadir-asignar-q-s') )
        this.app.use(this.PathReservas, require('../routes/reservas') )
        this.app.use(this.PathValoraciones, require('../routes/valoraciones') )
        this.app.use(this.PathAgendados, require('../routes/mostrar-agendado') )
    }  
    listen (){
        app.listen( this.puerto ) 
        console.log(`Servidor abierto en el puerto: ${this.puerto}`)
    }  
}

module.exports = Server 