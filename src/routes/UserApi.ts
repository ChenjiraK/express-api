import { Router } from 'express';
import { 
    getAllUser,
    getUser,
    createUser, 
    updateUser, 
    deleteUser 
} from '../controllers/UserController';

const router = Router();

router.get('/', getAllUser);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;