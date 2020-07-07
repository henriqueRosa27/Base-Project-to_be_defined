import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository, DeepPartial } from 'typeorm';
import { IUserService } from './iuser.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  create(user: UserEntity): Promise<DeepPartial<UserEntity>> {
    return this.repository.save(user);
  }

  get(): string {
    return "teste";
  }
}
