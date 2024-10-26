import { Router } from 'express'; // Importamos el módulo Router de Express para manejar las rutas de la aplicación.
import { createContent } from '../controllers/contentController'; // Importamos la función createContent desde el controlador de contenido.

const router = Router(); // Creamos una instancia del enrutador.

router.post('/', createContent); // Definimos una ruta POST en la raíz ('/') que ejecuta la función createContent al recibir una solicitud.

export default router; // Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.