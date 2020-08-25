import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from 'src/domain/entities';
import { AuthService } from 'src/services/services/auth.service';
import { AuthController } from 'src/api/controllers/auth.controller';
import { UserRepository } from 'src/infrastructure/repositories';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategies/jwt.stategie';

const providers = [
  { provide: 'IAuthService', useClass: AuthService },
  { provide: 'IUserRepository', useClass: UserRepository },
  JwtStrategy
];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: "123456789",
    }),
  ],
  controllers: [AuthController],
  providers,
})
export class AuthModule {}
