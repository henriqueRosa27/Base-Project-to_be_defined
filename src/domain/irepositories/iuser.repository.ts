import { UserEntity } from '../entities';

export interface IUserRepository {
  create(entity: UserEntity): Promise<UserEntity>;

  findByEmail(email: string): Promise<UserEntity>;
}
