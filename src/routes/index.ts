import { Router } from 'express';
import bodyParser from 'body-parser';

import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import classRoutes from './class.routes';
import studentClassRoutes from './studentClass.routes';

const routes = Router();
routes.use(bodyParser.json());

routes.use('/user', userRoutes);
routes.use('/session', sessionRoutes);
routes.use('/class', classRoutes);
routes.use('/student-class', studentClassRoutes);

export default routes;
