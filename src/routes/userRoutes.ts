import { Router } from 'express'; // Importamos el módulo Router de Express para manejar rutas.
import { createUser } from '../controllers/userController'; // Importamos la función createUser desde el controlador de usuarios.

const router = Router(); // Creamos una instancia del enrutador.

router.post('/register', createUser); // Definimos una ruta POST en '/register' que ejecuta la función createUser al recibir una solicitud.

export default router; // Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.