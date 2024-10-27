import { Request, Response, NextFunction } from 'express'; // Importamos Request, Response y NextFunction de Express.
import { IUser } from '../models/User'; // Importamos la interfaz IUser.

export const authorize = (roles: string[]) => {
  // Retornamos un middleware que verifica los roles del usuario.
  return (req: Request, res: Response, next: NextFunction) => {

    //@ts-ignore
    const user = req.user as IUser; // Asumimos que el usuario está en req.user después de la autenticación.

    // Verificamos si el usuario no está presente.
    if (!user) {
      return res.status(401).json({ message: 'No autorizado' }); // Respuesta si no hay usuario.
    }

    // Verificamos si el rol del usuario está incluido en los roles permitidos.
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Acceso denegado' }); // Respuesta si el rol no está permitido.
    }

    next(); // Llamamos a next() para continuar con el siguiente middleware o ruta.
  };
};