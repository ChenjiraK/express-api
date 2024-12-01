import { Router } from 'express';
import { login, getProfile, register } from '../controllers/AuthUserController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authenticateToken, getProfile);

export default router;