import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/categoryController';
import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';

const router = Router();

//@ts-ignore
router.post('/', authenticate, authorize(['admin']), createCategory); // Solo admin puede crear categorías
//@ts-ignore
router.get('/', authenticate, authorize(['admin', 'lector', 'creador']), getCategories); // Todo pueden leer categorías

export default router;