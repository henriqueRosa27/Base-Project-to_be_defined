import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import IUserRepository from '../../repositories/IUserRepository';
import AppError from '../../../errors/AppError';
import AuthConfig from '../../../config/auth';
import User from '../../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AutenticanteUser {
  private rep: IUserRepository;

  constructor(rep: IUserRepository) {
    this.rep = rep;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.rep.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = AuthConfig.jwt;
    console.log(user.id);
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}

export default AutenticanteUser;
