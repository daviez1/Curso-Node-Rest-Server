const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    correo:{
        type: String,
        required: [true, "El correo es obligatorio"]
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img:{
        type:String
    },
    rol:{
        type: String,
        required: [true, "El rol es obligatorio"],
        enum:["ADMIN_ROLE","USER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true,
    },
    estado:{
        type: Boolean,
        default: false,
    }
})

UsuarioSchema.methods.toJSON = function(){
    const { __v,password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema)

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