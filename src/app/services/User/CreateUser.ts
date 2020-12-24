import { hash } from 'bcryptjs';
import { provide } from 'inversify-binding-decorators';

import IUserRepository from '../../repositories/IUserRepository';
import User from '../../models/User';
import AppError from '../../../errors/AppError';
import { CreateUser as Request } from '../../api/dto/User';
import validate from '../../../middlewares/validationBody';
import schema from '../../../validations/user';

@provide(CreateUserService)
class CreateUserService {
  private rep: IUserRepository;

  constructor(rep: IUserRepository) {
    this.rep = rep;
  }

  public async execute({
    name,
    surname,
    email,
    password,
  }: Request): Promise<User> {
    await validate(
      {
        name,
        surname,
        email,
        password,
      },
      schema
    );

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
