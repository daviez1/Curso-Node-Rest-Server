const { Schema, model } = require('mongoose')

const ReservaSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    tipo:{
        type: String,
        required: [true, "El tipo de reserva es obligatorio"],
        enum: ["HABITACION", "PAQUETE", "EVENTO"]
    },
    adultos:{
        type: Number,
        required: [true, "La cantidad de adultos es obligatoria"]
    },
    ninios:{
        type: Number,
        required: [true, "La cantidad de niños es obligatoria"]
    },
    fecha:{
        type: Date,
        required: [true, "La fecha es obligatoria"]
    },
    descripcion:{
        type: String,
        required: [true, "La descripción es obligatorio"]
    },
    costo:{
        type: Number,
        required: [true, "El costo es obligatorio"]
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        // required: true
    },
    correo:{
        type: String,
    },
    estado:{
        type: Boolean,
        default: true,
    }
})

ReservaSchema.methods.toJSON = function(){
    const { __v,_id, estado, ...reservas } = this.toObject();  //Para obtener el resto de los datos de usuario
    reservas.uid = _id  //Para que visiblemente sea uid y no id
    return reservas;
}

module.exports = model('Reserva', ReservaSchema)