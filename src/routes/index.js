import { Router } from 'express';

import UserController from '../app/controllers/UserController';
import ClassController from '../app/controllers/ClassController';
import SessionController from '../app/controllers/SessionController';
import StudentClassContoller from '../app/controllers/StudentClassContoller';
import ActivityController from '../app/controllers/ActivityController';
import ActivityDeliveryController from '../app/controllers/ActivityDeliveryController';
import OCRController from '../app/controllers/OCRController';
import authMiddleware from '../app/middlewares/auth';
import uploadImage from '../app/middlewares/uploadImage';

const routes = new Router();

routes.post('/ocr', uploadImage, OCRController.create);

routes.post('/user', UserController.create);
routes.post('/login', SessionController.login);

routes.use(authMiddleware);

routes.get('/user', UserController.getAll);
routes.get('/user/:id', UserController.getById);

routes.get('/class', ClassController.getAll);
routes.get('/class/:id', ClassController.getById);
routes.get('/class/byCode/:code', ClassController.getByCode);
routes.post('/class', ClassController.create);
routes.put('/class/:id', ClassController.update);
routes.delete('/class/:id', ClassController.delete);

routes.post('/linkUserClass/code', StudentClassContoller.linkByCode);
routes.post('/linkUserClass/email', StudentClassContoller.linkByEmail);

routes.get('/activity', ActivityController.getAll);
routes.get('/activity/:id', ActivityController.getById);
routes.post('/activity', ActivityController.create);
routes.put('/activity/:id', ActivityController.update);
routes.delete('/activity/:id', ActivityController.delete);

routes.get('/activityDelivery', ActivityDeliveryController.getAll);
routes.get('/activityDelivery/:id', ActivityDeliveryController.getById);
routes.post(
  '/activityDelivery',
  uploadImage,
  ActivityDeliveryController.create
);
routes.put(
  '/activityDelivery/sendFeedback',
  ActivityDeliveryController.sendFeedback
);


export default routes;
