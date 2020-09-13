import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import validationParam from '../middlewares/validationParam';
import idParamValidation from '../validations/id';
import GetAllActivity from '../app/services/Activity/GetAllActivity';
import Activityrepository from '../app/repositories/implementations/ActivityRepository';
import Activity from '../app/models/Activity';
import {
  createActivityValidation,
  updateActivityValidation,
} from '../validations/activity';
import validationBody from '../middlewares/validationBody';
import CreateActivity from '../app/services/Activity/CreateActivity';
import UpdateActivity from '../app/services/Activity/UpdateActivity';

const activitiesRouter = Router();

activitiesRouter.get(
  '/:id/by-class',
  ensureAuthenticated,
  (request, response, next) =>
    validationParam(request, response, next, idParamValidation),
  async (request, response) => {
    const getAllClass = new GetAllActivity(
      new Activityrepository(getRepository(Activity, 'postgres'))
    );

    const { id } = request.params;

    const classes = await getAllClass.execute({ idClass: id });

    return response.json(classes);
  }
);

activitiesRouter.post(
  '/',
  ensureAuthenticated,
  (request, response, next) =>
    validationBody(request, response, next, createActivityValidation),
  async (request, response) => {
    const createActivity = new CreateActivity(
      new Activityrepository(getRepository(Activity, 'postgres'))
    );

    const { name, description, deadline, id_class } = request.body;

    const classes = await createActivity.execute({
      name,
      description,
      deadline,
      idClass: id_class,
    });

    return response.json(classes);
  }
);

activitiesRouter.put(
  '/:id',
  ensureAuthenticated,
  (request, response, next) =>
    validationParam(request, response, next, idParamValidation),
  (request, response, next) =>
    validationBody(request, response, next, updateActivityValidation),
  async (request, response) => {
    const updateActivity = new UpdateActivity(
      new Activityrepository(getRepository(Activity, 'postgres'))
    );

    const { name, description, deadline } = request.body;
    const { id } = request.params;

    const classes = await updateActivity.execute({
      name,
      description,
      deadline,
      id,
    });

    return response.json(classes);
  }
);

export default activitiesRouter;
