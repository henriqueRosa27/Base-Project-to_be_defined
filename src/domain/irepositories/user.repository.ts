import { UserEntity } from '../entities';

export interface IUserRepository {
  get(): Promise<UserEntity[]>;

  findByEmail(email: string): Promise<UserEntity>;
}
