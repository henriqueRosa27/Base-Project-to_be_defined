import { Router } from 'express';
import { getRepository } from 'typeorm';

import AutenticanteUser from '../app/services/Session/AutenticateUser';
import UserRepository from '../app/repositories/implementations/UserRepository';
import User from '../app/models/User';

const sessionsRouter = Router();

sessionsRouter.post('/login', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUser = new AutenticanteUser(
    new UserRepository(getRepository(User, 'postgres'))
  );

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionsRouter;
