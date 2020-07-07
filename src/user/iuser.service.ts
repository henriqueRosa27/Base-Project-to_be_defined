import { UserEntity } from './user.entity';
import { DeepPartial } from 'typeorm';

export interface IUserService {
  create(user: UserEntity): Promise<DeepPartial<UserEntity>>;
  get(): string;
}
