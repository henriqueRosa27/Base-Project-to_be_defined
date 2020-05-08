require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  port: '5432',
  username: 'postgres',
  password: '123456789!',
  database: 'to-be-defined',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
    freezeTableName: true,
  },
};
