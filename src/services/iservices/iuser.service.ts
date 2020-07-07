import { UserDto } from 'src/application/dto';

export interface IUserService {
  get(): Promise<UserDto[]>;
}
