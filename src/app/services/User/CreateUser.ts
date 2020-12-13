import { hash } from 'bcryptjs';
import { provide } from 'inversify-binding-decorators';
import { inject } from 'inversify';

import IUserRepository from '../../repositories/IUserRepository';
import User from '../../models/User';
import AppError from '../../../errors/AppError';
import { CreateUser as Request } from '../../api/dto/User';

// eslint-disable-next-line no-use-before-define
@provide(CreateUserService)
class CreateUserService {
  @inject('IUserRepository') private readonly rep: IUserRepository;

  public async execute({
    name,
    surname,
    email,
    password,
  }: Request): Promise<User> {
    const emailResult = await this.rep.findByEmail(email);
    if (emailResult) {
      throw new AppError('Email address already used', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = new User();
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.password = hashedPassword;

    return this.rep.create(user);
  }
}

export default CreateUserService;
