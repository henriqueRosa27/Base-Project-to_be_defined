import { createConnection } from 'typeorm';

createConnection()
  .then(async connection => {
    console.log(!connection.isConnected ? 'não conectado' : '');
  })
  .catch(error => console.log(error));
