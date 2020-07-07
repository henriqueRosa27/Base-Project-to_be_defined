import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './application/modules';
import * as ormconfig from './infrastructure/database/ormconfig';

const imports = [TypeOrmModule.forRoot(ormconfig), UserModule]

@Module({
  imports ,
  controllers: [],
  providers: [],
})
export class AppModule {}
