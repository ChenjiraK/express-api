import { Router } from 'express';
import BadgeApi from './BadgeApi';
import CategoryApi from './CategoryApi';

const routes = Router();

routes.use('/badge', BadgeApi);
routes.use('/category', CategoryApi);

export default routes;
