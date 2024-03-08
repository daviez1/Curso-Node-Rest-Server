const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../dbConeccion/config')

const app = express() 

class Server{

    constructor(){
        this.app = app;
        this.puerto = process.env.PORT
        this.PathUsuarios = '/api/usuarios'
        
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
        this.app.use(this.PathUsuarios, require('../routes/users') )
    }  
    listen (){
        app.listen( this.puerto ) 
        console.log(`Servidor abierto en el puerto: ${this.puerto}`)
    }  
}

module.exports = Server 