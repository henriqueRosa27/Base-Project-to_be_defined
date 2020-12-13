import { Router } from 'express';

import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import classRoutes from './class.routes';
import studentClassRoutes from './studentClass.routes';
import activityRoutes from './activity.routes';
import activityDeliveryRoutes from './activitydelivery.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/session', sessionRoutes);
routes.use('/class', classRoutes);
routes.use('/student-class', studentClassRoutes);
routes.use('/activity', activityRoutes);
routes.use('/activity-delivery', activityDeliveryRoutes);

export default routes;
