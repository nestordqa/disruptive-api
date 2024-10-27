import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/categoryController';

const router = Router();

//@ts-ignore
router.post('/category', createCategory); // Solo admin puede crear categorías
//@ts-ignore
router.get('/category', getCategories); // Todo pueden leer categorías

export default router;