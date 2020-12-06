import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import validationParam from '../middlewares/validationParam';
import idParamValidation from '../validations/id';
import GetAllActivityDelivery from '../app/services/ActivityDelivery/GetAllActivityDelivery';
import ActivityDeliveryRepository from '../app/repositories/implementations/ActivityDeliveryRepository';
import ActivityDelivery from '../app/models/ActivityDelivery';
import CreateActivityDelivery from '../app/services/ActivityDelivery/CreateActivityDelivery';
import validationBody from '../middlewares/validationBody';
import {
  createActivityDeliveryValidation,
  sendFeedbackValidation,
} from '../validations/activityDelivery';
import SendFeedbackActivitydelivery from '../app/services/ActivityDelivery/SendFeedback';
import uploadConfig from '../config/multer';

const activitiesDeliveryRouter = Router();
const upload = multer(uploadConfig);

activitiesDeliveryRouter.get(
  '/:id/by-activity',
  ensureAuthenticated,
  (request, response, next) =>
    validationParam(request, response, next, idParamValidation),
  async (request, response) => {
    const getAllClass = new GetAllActivityDelivery(
      new ActivityDeliveryRepository(
        getRepository(ActivityDelivery, 'postgres')
      )
    );

    const { id } = request.params;

    const activitiesdelivery = await getAllClass.execute({ idActivity: id });

    return response.json(activitiesdelivery);
  }
);

activitiesDeliveryRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('image'),
  (request, response, next) =>
    validationBody(request, response, next, createActivityDeliveryValidation),
  async (request, response) => {
    const createActivitydelivery = new CreateActivityDelivery(
      new ActivityDeliveryRepository(
        getRepository(ActivityDelivery, 'postgres')
      )
    );

    const { note, report, id_activity } = request.body;

    const activityDelivery = await createActivitydelivery.execute({
      note,
      report,
      file: request.file.filename,
      id_activity,
      id_user: request.user.id,
    });

    return response.json(activityDelivery);
  }
);

activitiesDeliveryRouter.patch(
  '/:id',
  ensureAuthenticated,
  (request, response, next) =>
    validationParam(request, response, next, idParamValidation),
  (request, response, next) =>
    validationBody(request, response, next, sendFeedbackValidation),
  async (request, response) => {
    const sendFeedback = new SendFeedbackActivitydelivery(
      new ActivityDeliveryRepository(
        getRepository(ActivityDelivery, 'postgres')
      )
    );

    const { id } = request.params;
    const { feedback } = request.body;

    const classes = await sendFeedback.execute({ feedback, id });

    return response.json(classes);
  }
);

export default activitiesDeliveryRouter;
