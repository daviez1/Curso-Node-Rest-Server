const express = require('express')
const cors = require('cors')

const app = express() 

class Server{

    constructor(){
        this.app = app;
        this.puerto = process.env.PORT
        this.PathUsuarios = '/api'
        
        this.middlewares()
        this.routes()
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
    }  
}

module.exports = Server 