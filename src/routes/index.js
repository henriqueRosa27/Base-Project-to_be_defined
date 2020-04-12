import { Router } from 'express';

import UserController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessioController';
import authMiddleware from '../app/middlewares/auth';

const routes = new Router();

routes.post('/user', UserController.create);
routes.post('/login', SessionController.login);

routes.use(authMiddleware);

routes.get('/user', UserController.getAll);
routes.get('/user/:id', UserController.getById);

export default routes;
