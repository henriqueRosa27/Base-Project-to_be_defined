import { IAuthService } from '../iservices';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUserRepository } from 'src/domain/irepositories';
import { UserDto, LoginDto } from 'src/application/dto';
import { JwtService } from '@nestjs/jwt';
import { plainToClass, classToPlain } from 'class-transformer';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository') private repository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<any> {
    const entity = await this.repository.findByEmail(dto.email);

    if (!entity) {
      throw new HttpException(
        { error: 'E-mail e/ou senha incorretos' },
        HttpStatus.BAD_REQUEST,
      );
    }
    
    if (!(await argon2.verify(entity.password, dto.password))) {
      throw new HttpException(
        { error: 'E-mail e/ou senha incorretos' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      user: {
        id: entity.id,
        name: entity.name,
        surname: entity.surname,
        email: entity.email,
      },
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
