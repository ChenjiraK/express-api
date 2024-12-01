import { Router } from 'express';
import { 
    getAllBadges, 
    createBadge, 
    updateBadge, 
    deleteBadge 
} from '../controllers/BadgeController';

const router = Router();

router.get('/', getAllBadges);
router.post('/', createBadge);
router.get('/:id', createBadge);
router.put('/:id', updateBadge);
router.delete('/:id', deleteBadge);

export default router;