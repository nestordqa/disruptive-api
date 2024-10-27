import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';
import {
    registerUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} from '../controllers/userController';

const router = Router();

//Ruta para el registro de usuarios
//@ts-ignore
router.post('/register', authenticate, authorize(['admin', 'creador']), registerUser);

// Ruta para obtener todos los usuarios
//@ts-ignore
router.get('/users', authenticate, authorize(['admin', 'lector', 'creador']), getAllUsers);

// Ruta para obtener un usuario por ID
//@ts-ignore
router.get('/users/:id', authenticate, authorize(['admin', 'lector', 'creador']), getUserById);

// Ruta para actualizar un usuario por ID
//@ts-ignore
router.put('/users/:id', authenticate, authorize(['admin', 'creador']), updateUserById);

// Ruta para eliminar un usuario por ID
//@ts-ignore
router.delete('/users/:id', authenticate, authorize(['admin']), deleteUserById);

//@ts-ignore
router.post('/login', loginUser);

export default router;