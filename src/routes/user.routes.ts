import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../app/services/User/CreateUser';
import UserRepository from '../app/repositories/implementations/UserRepository';
import validationBody from '../middlewares/validationBody';
import createUserValidation from '../validations/user';
import User from '../app/models/User';

const userRouter = Router();

userRouter.post(
  '/',
  (request, response, next) =>
    validationBody(request, response, next, createUserValidation),
  async (request, response) => {
    const createUser = new CreateUserService(
      new UserRepository(getRepository(User, 'postgres'))
    );

    const { name, surname, email, password } = request.body;

    const data = await createUser.execute({
      name,
      surname,
      email: email.toLowerCase(),
      password,
    });

    return response.json(data);
  }
);

export default userRouter;
