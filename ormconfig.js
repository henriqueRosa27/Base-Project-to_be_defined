const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';
const ssl =
  process.env.NODE_ENV !== 'development'
    ? {}
    : {
        ssl: {
          rejectUnauthorized: false,
        },
      };

module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['./' + rootDir + '/app/models/**/*{.ts,.js}'],
  migrations: ['./' + rootDir + '/database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  ssl: ssl.ssl,
};
