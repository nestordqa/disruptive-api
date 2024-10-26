import { Router } from 'express'; // Importamos el módulo Router de Express para manejar las rutas de la aplicación.
import { createCategory } from '../controllers/categoryController'; // Importamos la función createCategory desde el controlador de categorías.

const router = Router(); // Creamos una instancia del enrutador.

router.post('/', createCategory); // Definimos una ruta POST en la raíz ('/') que ejecuta la función createCategory al recibir una solicitud.

export default router; // Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.