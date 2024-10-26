import { Request, Response } from 'express'; // Importamos Request y Response de Express.
import User from '../models/User'; // Importamos el modelo User.

export const createUser = async (req: Request, res: Response) => {
  const { alias, email, role } = req.body; // Extraemos datos del cuerpo de la solicitud.
  
  try {
    const user = new User({ alias, email, role }); // Creamos una nueva instancia de User.
    await user.save(); // Guardamos el usuario en la base de datos.
    res.status(201).json(user); // Respondemos con el usuario creado.
  } catch (error: any) {
    res.status(400).json({ error: error.message }); // Respondemos con un mensaje de error.
  }
};