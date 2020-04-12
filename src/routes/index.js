import { Router } from 'express';
// import multer from 'multer';
// import multerConfig from '../config/multer';

import UserController from "../app/controllers/UserController";

const routes = new Router();

// const upload = multer(multerConfig);


routes.get('/user', UserController.getAll);
routes.get('/user/:id', UserController.getById);
routes.post('/user', UserController.create);

// routes.use(authMiddleware);

// module.exports = routes;
export default routes;
