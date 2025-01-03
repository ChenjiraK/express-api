import { Router } from 'express';
import { 
    getAllCategories, 
    createCategory,
    getCategory, 
    updateCategory, 
    deleteCategory 
} from '../controllers/CategoryController';

const router = Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;