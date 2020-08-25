import { ClassController } from './../../api/controllers/class.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from 'src/domain/entities';
import { JwtStrategy } from '../strategies/jwt.stategie';
import { ClassRepository } from 'src/infrastructure/repositories/class.repository';
import { ClassService } from 'src/services/services/class.service';

const providers = [
  { provide: 'IClassRepository', useClass: ClassRepository },
  { provide: 'IClassService', useClass: ClassService },
  JwtStrategy,
];

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity])],
  controllers: [ClassController],
  providers,
})
export class ClassModule {}
