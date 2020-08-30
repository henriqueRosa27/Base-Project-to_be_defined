import { Router } from 'express';
import bodyParser from 'body-parser';

import userRoutes from './user.routes';
import sessionRoutes from './session.routes';

const routes = Router();
routes.use(bodyParser.json());

routes.use('/user', userRoutes);
routes.use('/session', sessionRoutes);

export default routes;
