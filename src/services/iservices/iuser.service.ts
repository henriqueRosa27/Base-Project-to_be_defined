import { UserEntity } from 'src/domain/entities';

export interface IUserService {
  get(): Promise<UserEntity[]>;
}
