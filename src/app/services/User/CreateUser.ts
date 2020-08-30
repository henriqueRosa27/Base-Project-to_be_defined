import { hash } from 'bcryptjs';

import IUserRepository from '../../repositories/IUserRepository';
import User from '../../models/User';
import AppError from '../../../errors/AppError';

interface Request {
  name: string;
  surname: string;
  email: string;
  password: string;
}

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
