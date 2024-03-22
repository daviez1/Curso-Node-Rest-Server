const { Schema, model } = require('mongoose')

const ValoracionesSchema = Schema({
    fecha:{
        type: Date,
        required: [true, "La fecha es obligatoria"]
    },
    nombre:{
        type: String,
        required: [true, "El nombre es obligatorio"]
        },
    correo:{
        type: String,
        required: [true, "El correo es obligatorio"]
    },
    descripcion:{
        type: String,
        required: [true, "La descripción es obligatoria"]
    },
    estado:{
        type: Boolean,
        default: true,
    }
})

ValoracionesSchema.methods.toJSON = function(){
    const { __v,_id, ...valoracion } = this.toObject();  //Para obtener el resto de los datos de usuario
    valoracion.uid = _id  //Para que visiblemente sea uid y no id
    return valoracion;
}

module.exports = model('Valoracione', ValoracionesSchema)