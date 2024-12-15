import { Router } from 'express';
import { login, register, getProfile, updateProfile } from './AuthController';
import { authenticateToken } from '../../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

export default router;
