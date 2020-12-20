import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import IUserRepository from '../../repositories/IUserRepository';
import User from '../../models/User';
import AppError from '../../../errors/AppError';
import AuthConfig from '../../../config/auth';

interface Request {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
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
  }: Request): Promise<Response> {
    const emailResult = await this.rep.findByEmail(email);
    if (emailResult) {
      throw new AppError('Email address already used', 400);
    }

    const hashedPassword = await hash(password, 8);

    const entity = new User();
    entity.name = name;
    entity.surname = surname;
    entity.email = email;
    entity.password = hashedPassword;

    const user = await this.rep.create(entity);
    delete user.password;

    const { secret, expiresIn } = AuthConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const response = { user, token };

    return response;
  }
}

export default CreateUserService;
