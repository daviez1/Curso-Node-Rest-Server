const { Schema, model } = require('mongoose')

const EventoSchema = Schema({
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
    }
})

EventoSchema.methods.toJSON = function(){
    const { __v,_id, ...evento } = this.toObject();  //Para obtener el resto de los datos de usuario
    evento.uid = _id  //Para que visiblemente sea uid y no id
    return evento;
}

module.exports = model('Evento', EventoSchema)

// const { Model } = require("sequelize");
// const { client } = require("../dbConeccion/config");

// const getUsers = async()=>{
//     try{
//         const query = 'Select * from usuarios';
//         const result = await client.query(query);
//         for (let i = 0; i < result.rowCount; i++) {
//             return console.log(`El usuario ${result.rows[i].usuario} tiene la contraseña ${result.rows[i].contraseña}`);   
//         }
//     }catch(error){
//         console.error('Error al obtener usuarios:', error)
//         throw error
//     }
// }
// const createUser = async(username, password)=>{
// try{
//     const crear = 'Insert into usuarios(usuario,contraseña) values($1,$2) Returning *'
// const values = [username, password]
// const result = await client.query(crear,values)
// return result.rows[0] 
// }catch(err){
//     console.error('Existe un error al crear usuario:', err)
// }
// }

// // createUser('Agustin', 'missMargaret')
// getUsers()

// module.exports = { getUsers }