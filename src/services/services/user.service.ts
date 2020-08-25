import { IUserService } from '../iservices';
import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from 'src/domain/irepositories';
import { UserDto, CreateUserDto } from 'src/application/dto';
import { plainToClass, classToPlain } from 'class-transformer';
import { UserEntity } from 'src/domain/entities';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('IUserRepository') private repository: IUserRepository) {}

  async create(user: CreateUserDto): Promise<UserDto> {
    delete user.confirm_password;

    const entity = plainToClass(UserEntity, classToPlain(user));
    const saved = await this.repository.create(entity);
    return plainToClass(UserDto, classToPlain(saved));
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.repository.findByEmail(email);
    return plainToClass(UserDto, user);
  }
}
