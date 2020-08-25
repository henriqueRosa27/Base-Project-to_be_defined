import { ConnectionOptions } from 'typeorm';
import { UserEntity, ClassEntity } from 'src/domain/entities';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456789!',
  database: 'to-be-defined',
  entities: [UserEntity, ClassEntity],
  migrationsTableName: 'migrations_typeorm',
  logging: true,
  logger: 'file',

  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/infrastructure/database/migrations',
  },
};

export = config;
