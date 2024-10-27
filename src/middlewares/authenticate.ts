import { Request, Response, NextFunction } from 'express'; // Importamos Request, Response y NextFunction de Express.
import jwt from 'jsonwebtoken'; // Importamos jsonwebtoken para manejar la verificación de tokens.
import User from '../models/User'; // Importamos el modelo User.

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  // Extraemos el token del encabezado de autorización.
  const token = req.headers.authorization?.split(' ')[1];

  // Verificamos si el token no está presente.
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' }); // Respuesta si no hay token.
  }

  try {
    // Verificamos y decodificamos el token usando la clave secreta.
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as any);
    // Buscamos el usuario en la base de datos usando el ID decodificado.
    const user = await User.findById(decoded.id);
    
    // @ts-ignore
    req.user = user; // Almacenamos el usuario en la solicitud para su uso posterior.
    next(); // Llamamos a next() para continuar con el siguiente middleware o ruta.
  } catch (error) {
    // Manejo de errores si el token es inválido.
    res.status(401).json({ message: 'Token inválido' }); // Respuesta si el token no es válido.
  }
};