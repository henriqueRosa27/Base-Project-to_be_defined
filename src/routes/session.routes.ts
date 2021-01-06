import { Router } from 'express';
import { getRepository } from 'typeorm';

import AutenticanteUser from '../app/services/Session/AutenticateUser';
import UserRepository from '../app/repositories/implementations/UserRepository';
import User from '../app/models/User';
import validationBody from '../middlewares/validationBody';
import sessionLoginValidation from '../validations/session';

const sessionsRouter = Router();

sessionsRouter.post(
  '/login',
  (request, response, next) =>
    validationBody(request, response, next, sessionLoginValidation),
  async (request, response) => {
    const { email, password } = request.body;
    const authenticateUser = new AutenticanteUser(
      new UserRepository(getRepository(User, 'postgres'))
    );

    const { user, token } = await authenticateUser.execute({
      email: email.toLowerCase(),
      password,
    });

    return response.json({ user, token });
  }
);

export default sessionsRouter;
