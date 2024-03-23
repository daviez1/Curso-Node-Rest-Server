const { Schema, model } = require('mongoose')

const ServicioSchema = Schema({
    tipo:{
        type: String,
        required: [true, "El tipo de servicio es obligatorio"]
    },
    descripcion:{
        type: String,
        required: [true, "La descripción es obligatorio"]
    },
    estado:{
        type: Boolean,
        default: true,
    },
    img: { type: String}
})

ServicioSchema.methods.toJSON = function(){
    const { __v,_id, ...servicio } = this.toObject();  //Para obtener el resto de los datos de usuario
    servicio.uid = _id  //Para que visiblemente sea uid y no id
    return servicio;
}

module.exports = model('Servicio', ServicioSchema)