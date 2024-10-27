import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  // Excluye endpoints que no necesitan validacion
  if (req.path === '/api/login/') {
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.DISRUPTIVE_API as any);
    const user = await User.findById(decoded.id);

    // @ts-ignore
    req.user = user;

    // Role-based access control
    // @ts-ignore
    if (user.role === 'lector') {
      // Solo permite peticiones GET
      if (req.method !== 'GET') {
        return res.status(403).json({ message: 'Acceso denegado: solo se permiten solicitudes GET' });
      }
      // @ts-ignore
    } else if (user.role === 'creador') {
      // Permite todas las peticiones menos DELETE
      if (req.method === 'DELETE') {
        return res.status(403).json({ message: 'Acceso denegado: no se permiten solicitudes DELETE' });
      }
      // @ts-ignore
    } else if (user.role === 'admin') {
      //El admin puede acceder a cualquier endpoint
      return next();
    }

    // Si el rol no está correctamente definido
    return res.status(403).json({ message: 'Acceso denegado' });

  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};