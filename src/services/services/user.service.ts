import { IUserService } from '../iservices';
import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities';
import { IUserRepository } from 'src/domain/irepositories';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('IUserRepository') private repository: IUserRepository) {}

  get(): Promise<UserEntity[]> {
    return this.repository.get();
  }
}
