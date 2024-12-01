import { Router } from 'express';
import BadgeApi from './BadgeApi';
import CategoryApi from './CategoryApi';
import UserApi from './UserApi';

const routes = Router();

routes.use('/badge', BadgeApi);
routes.use('/category', CategoryApi);
routes.use('/user', UserApi);

export default routes;
