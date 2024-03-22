// controllers/booleanController.js
const atencionAlCliente = require("../models/atencion-al-cliente");
const atencionCliente = require("../models/atencion-al-cliente");

const { response } = require("express");

const AtencionAlClientePost = async(req = request, res = response)=> {
   
    const { fecha, nombre, descripcion, correo, tipo } = req.body;
    const existeQueja = await atencionCliente.findOne({ descripcion })
    
    if(existeQueja){
        return res.json({
            msg: `Ya estamos trabajando para responder a su inquietud`
        })
    }

    const queja_sugerencia = new atencionCliente ( {fecha, nombre, descripcion, correo, tipo} )
    res.status(200).json({
    msg: 'Su queja ha sido enviada',
    queja_sugerencia
})
    await queja_sugerencia.save()
}

const asignarEstadoALaQuejaSugerencia = async( req = request, res = response) =>{
    
    try {
      const { id } = req.params;
      const existeQueja = await atencionAlCliente.findById(id);
    
      if (!existeQueja) {
        return res.status(404).json({ message: 'La queja o sugerencia no existe' });
      }
    
      // Cambia el valor booleano
      existeQueja.estado = !existeQueja.estado;
    
      // Guarda los cambios
      await existeQueja.save();
      return res.status(200).json({ message: 'Estado de la queja o sugerencia actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar el estado de la queja o sugerencia:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

}

module.exports = {
    AtencionAlClientePost,
    asignarEstadoALaQuejaSugerencia
}





