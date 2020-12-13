import { createConnection } from 'typeorm';

createConnection()
  .then(async connection => {
    console.log(!connection.isConnected ? 'não conectado' : 'conectado');
  })
  .catch(error => console.log(error));
