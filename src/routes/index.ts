import { Router } from 'express';
import BadgeApi from './BadgeApi';
import CategoryApi from './CategoryApi';
import UserApi from './UserApi';
import AuthApi from './AuthApi';
const routes = Router();

routes.use('/badge', BadgeApi);
routes.use('/category', CategoryApi);
routes.use('/user', UserApi);

routes.use('/auth', AuthApi);

export default routes;
