import { UserDto } from 'src/application/dto';

export interface IUserService {
  get(): Promise<UserDto[]>;

  findByEmail(email: string) : Promise<UserDto>;
}
