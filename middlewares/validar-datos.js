const { validationResult } = require('express-validator')
const validarDatos = (req, res, next) =>{

    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json(error)
    }
    next() //para que pase al siguiente middleware(cada check es un middleware)
} 

module.exports = validarDatos