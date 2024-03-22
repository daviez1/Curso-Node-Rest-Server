const { Schema, model } = require('mongoose')

const AtencionSchema = Schema({
    fecha:{
        type: Date,
        // required: [true, "La fecha es obligatoria"]
    },
    nombre:{
        type: String,
        // required: [true, "El nombre es obligatorio"]
        },
    correo:{
        type: String,
        // required: [true, "El correo es obligatorio"]
    },
    descripcion:{
        type: String,
        // required: [true, "La descripción es obligatoria"]
    },
    tipo:{
        type: String,
        // required: [true, "El tipo es obligatorio"]
    },
    estado:{
        type: Boolean,
        default: true,
    }
})

AtencionSchema.methods.toJSON = function(){
    const { __v,_id, ...atencion } = this.toObject();  //Para obtener el resto de los datos de usuario
    atencion.uid = _id  //Para que visiblemente sea uid y no id
    return atencion;
}

module.exports = model('AtencionCliente', AtencionSchema)