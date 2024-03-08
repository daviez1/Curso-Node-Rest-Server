const {client} = require('./dbConeccion/config')

async function sayHello() { 
    
    //   await client.connect();
      console.log('Conexión establecida');
       const res = await client.query('SELECT id, nombre_usuario from cliente'),
       res1 = await client.query('SELECT * from habitacion Where disponibilidad = true'),
       clientes = await client.query('Select * from cliente') 
       for (let i = 0; i < clientes.rowCount; i++) {
         console.log(`El id de ${clientes.rows[i].nombre} es: ${clientes.rows[i].id}`) 
       }
       cant_filas_res1 = await client.query('SELECT Count(*) as num_filas from habitacion Where disponibilidad = true')
       console.log(res.rows[0].id,res.rows[1].id,cant_filas_res1.rows[0].num_filas)
      //  console.log(res1.rows[i].numero)
    //   }
    //   catch (error) {
    //     console.error('Error al ejecutar la consulta:', error);
    //   } finally {
    //     // await client.end();
    //   }  
    //  } 
}
     sayHello() 