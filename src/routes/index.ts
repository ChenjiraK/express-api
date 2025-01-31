import { Router } from 'express';
import BadgeApi from '../modules/badge/BadgeApi';
import CategoryApi from '../modules/category/CategoryApi';
import AuthApi from '../modules/auth/AuthApi';
const routes = Router();

routes.use('/badge', BadgeApi);
routes.use('/category', CategoryApi);

routes.use('/auth', AuthApi);

export default routes;
