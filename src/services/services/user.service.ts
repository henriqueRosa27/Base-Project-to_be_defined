import { IUserService } from '../iservices';
import { Injectable, Inject, Optional } from '@nestjs/common';
import { IUserRepository } from 'src/domain/irepositories';
import { UserDto } from 'src/application/dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService implements IUserService {
  constructor( @Inject('IUserRepository') private repository: IUserRepository) {}

  async get(): Promise<UserDto[]> {
    const entity = await this.repository.get();

    const dto = plainToClass(UserDto, entity);

    return dto;
  }

  async findByEmail(email: string) : Promise<UserDto> {
    const user = await this.repository.findByEmail(email);
    return plainToClass(UserDto, user);
  }
}
