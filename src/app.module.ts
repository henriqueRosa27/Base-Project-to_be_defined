import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule, AuthModule, ClassModule } from './application/modules';
import * as ormconfig from './infrastructure/database/ormconfig';

const imports = [
  TypeOrmModule.forRoot(ormconfig),
  UserModule,
  AuthModule,
  ClassModule,
];

@Module({
  imports,
  controllers: [],
  providers: [],
})
export class AppModule {}
