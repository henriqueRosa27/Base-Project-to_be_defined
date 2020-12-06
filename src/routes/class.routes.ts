import { Router } from 'express';
import { getRepository } from 'typeorm';
import GetAllClass from '../app/services/Class/GetAllClass';
import CreateClass from '../app/services/Class/CreateClass';
import UpdateClass from '../app/services/Class/UpdateClass';
import GetByIdClass from '../app/services/Class/GetByIdClass';
import ClassRepository from '../app/repositories/implementations/ClassRepository';
import Class from '../app/models/Class';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import validationBody from '../middlewares/validationBody';
import validationParam from '../middlewares/validationParam';
import createClassValidation from '../validations/class';
import idParamValidation from '../validations/id';

const classesRouter = Router();

classesRouter.get('/', ensureAuthenticated, async (request, response) => {
  const getAllClass = new GetAllClass(
    new ClassRepository(getRepository(Class, 'postgres'))
  );

  const { id } = request.user;

  const classes = await getAllClass.execute(id);

  return response.json(classes);
});

classesRouter.get('/:id', ensureAuthenticated, async (request, response) => {
  const getByIdClass = new GetByIdClass(
    new ClassRepository(getRepository(Class, 'postgres'))
  );

  const { id } = request.params;

  const classes = await getByIdClass.execute(id);

  return response.json(classes);
});

classesRouter.post(
  '/',
  ensureAuthenticated,
  (request, response, next) =>
    validationBody(request, response, next, createClassValidation),
  async (request, response) => {
    const createClass = new CreateClass(
      new ClassRepository(getRepository(Class, 'postgres'))
    );

    const { name, description } = request.body;
    const userId = request.user.id;

    const classes = await createClass.execute({ name, description, userId });

    return response.json(classes);
  }
);

classesRouter.put(
  '/:id',
  ensureAuthenticated,
  (request, response, next) =>
    validationBody(request, response, next, createClassValidation),
  (request, response, next) =>
    validationParam(request, response, next, idParamValidation),
  async (request, response) => {
    const updateClass = new UpdateClass(
      new ClassRepository(getRepository(Class, 'postgres'))
    );

    const { name, description } = request.body;
    const { id } = request.params;

    const classes = await updateClass.execute({ name, description, id });

    return response.json(classes);
  }
);

export default classesRouter;
