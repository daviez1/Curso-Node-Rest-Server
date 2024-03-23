
const  validarDatos = require('../middlewares/validar-datos');
const  {validarJWT}  = require('../middlewares/validar-jwt');
const  {validarArchivoSubir}  = require('../middlewares/validar-archivo');

module.exports = {
  ...validarDatos,
  ...validarJWT,
  ...validarArchivoSubir
}