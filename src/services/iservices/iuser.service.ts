import { CreateUserDto, UserDto} from 'src/application/dto';

export interface IUserService {
  create(user: CreateUserDto): Promise<UserDto>;

  findByEmail(email: string) : Promise<UserDto>;
}
