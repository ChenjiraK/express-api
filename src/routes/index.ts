import { Router } from 'express';
import BadgeApi from '../modules/badge/BadgeApi';
import CategoryApi from '../modules/category/CategoryApi';
import UserApi from '../modules/auth/UserApi';
import AuthApi from '../modules/auth/AuthApi';
const routes = Router();

routes.use('/badge', BadgeApi);
routes.use('/category', CategoryApi);
routes.use('/user', UserApi);

routes.use('/auth', AuthApi);

export default routes;
