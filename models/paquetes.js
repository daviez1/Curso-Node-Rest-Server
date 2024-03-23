const { Schema, model } = require('mongoose')

const PaqueteSchema = Schema({
    fecha:{
        type: Date,
        required: [true, "La fecha es obligatoria"]
    },
    nombre:{
        type: String,
        required: [true, "El nombre es obligatorio"]
        },
    adultos:{
        type: Number,
        required: [true, "La cantidad de adultos es obligatoria"]
    },
    ninios:{
        type: Number,
        required: [true, "La cantidad de niños es obligatoria"]
    },
    costo:{
        type: Number,
        required: [true, "El precio es obligatorio"]
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

PaqueteSchema.methods.toJSON = function(){
    const { __v,_id, ...paquete } = this.toObject();  //Para obtener el resto de los datos de paquete
    paquete.uid = _id  //Para que visiblemente sea uid y no id
    return paquete;
}

module.exports = model( 'Paquete', PaqueteSchema )

