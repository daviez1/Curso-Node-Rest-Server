const mongoose = require('mongoose')

const dbConnection =async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS)
     console.log('Base de datos online')
  } catch (error) {
    console.log(error)
    throw new Error('Error al conectar la DB')
  }
}

module.exports = {
  dbConnection
}

//////////////Postgre
// const { Client } = require('pg')
// const client = new Client({
//   user: 'postgres',
//   password: 'Davi**44',
//   database: 'postgres',
//   port: 5432})
    
// async function dbConnection() {  
//   client.connect()
//   .then(() => {
//     console.log('Conexión exitosa');
//     // Realizar tus consultas aquí
//   })
//   .catch((err) => {
//     console.error('Error al conectar:', err);
//   })
  // .finally(() => {
  //     // Cerrar la conexión al finalizar
  //     client.end()
  //       .then(() => {
  //         console.log('Cliente desconectado');
  //       })
  //       .catch((err) => {
  //         console.error('Error al desconectar:', err);
  //       });
  //   });
// }  
//  dbConnection() 
//  module.exports = { client, dbConnection }


