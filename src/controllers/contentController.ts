import { Request, Response } from 'express'; // Importamos Request y Response de Express.
import Content from '../models/Content'; // Importamos el modelo Content.

export const createContent = async (req: Request, res: Response) => {
  const { title, category, user, type, url } = req.body; // Extraemos datos del cuerpo de la solicitud.
  
  try {
    const content = new Content({ title, category, user, type, url }); // Creamos una nueva instancia de Content.
    await content.save(); // Guardamos el contenido en la base de datos.
    res.status(201).json(content); // Respondemos con el contenido creado.
  } catch (error: any) {
    res.status(400).json({ error: error.message }); // Respondemos con un mensaje de error.
  }
};