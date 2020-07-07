import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/entities';
import { UserService } from 'src/services/services/user.service';
import { UserRepository } from 'src/infrastructure/repositories';
import { UserController } from '../../api/controllers/user.controller';

const providers = [
  { provide: 'IUserRepository', useClass: UserRepository },
  { provide: 'IUserService', useClass: UserService },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers,
})
export class UserModule {}
