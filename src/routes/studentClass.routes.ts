import { Router } from 'express';
import { getRepository } from 'typeorm';

import Class from '../app/models/Class';
import User from '../app/models/User';
import ClassRepository from '../app/repositories/implementations/ClassRepository';
import UserRepository from '../app/repositories/implementations/UserRepository';
import LinkByCodeService from '../app/services/StudentClass/LinkByCode';
import LinkByEmailService from '../app/services/StudentClass/LinkByEmail';
import validationBody from '../middlewares/validationBody';
import {
  linkByCodeValidation,
  linkByEmailValidation,
} from '../validations/studentClass';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const studentClassRouter = Router();

studentClassRouter.post(
  '/by-code',
  ensureAuthenticated,
  (request, response, next) =>
    validationBody(request, response, next, linkByCodeValidation),
  async (request, response) => {
    const linkByCode = new LinkByCodeService(
      new ClassRepository(getRepository(Class, 'postgres'))
    );

    const { code } = request.body;

    const data = await linkByCode.execute({
      code: code.toLowerCase(),
      userId: request.user.id,
    });

    return response.json(data);
  }
);

studentClassRouter.post(
  '/by-email',
  ensureAuthenticated,
  (request, response, next) =>
    validationBody(request, response, next, linkByEmailValidation),
  async (request, response) => {
    const linkByCode = new LinkByEmailService(
      new ClassRepository(getRepository(Class, 'postgres')),
      new UserRepository(getRepository(User, 'postgres'))
    );

    const { email, id_class } = request.body;

    const data = await linkByCode.execute({
      email: email.toLowerCase(),
      idClass: id_class,
    });

    return response.json(data);
  }
);

export default studentClassRouter;
