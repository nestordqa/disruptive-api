import { Request, Response, NextFunction } from 'express'; // Importamos Request, Response y NextFunction.
import { IUser } from '../models/User'; // Importamos la interfaz IUser.

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    // @ts-ignore
    const user = req.user as IUser; // Asumimos que el usuario está en req.user después de la autenticación.

    if (!user) {
      return res.status(401).json({ message: 'No autorizado' }); // Respuesta si no hay usuario.
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Acceso denegado' }); // Respuesta si el rol no está permitido.
    }

    next(); // Llamamos a next() si la autorización es exitosa.
  };
};