require('dotenv/config');

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAMEs,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
    freezeTableName: true,
  },
};
