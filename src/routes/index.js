import { Router } from 'express';

import UserController from '../app/controllers/UserController';
import ClassController from '../app/controllers/ClassController';
import SessionController from '../app/controllers/SessioController';
import StudentClassContoller from '../app/controllers/StudentClassContoller';
import ActivityController from '../app/controllers/ActivityController';
import authMiddleware from '../app/middlewares/auth';

const routes = new Router();

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

routes.gets('/activity', ActivityController.getAll);
routes.get('/activity/:id', ActivityController.getById);

export default routes;
