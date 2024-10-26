import { Request, Response } from 'express'; // Importamos Request y Response de Express.
import Category from '../models/Category'; // Importamos el modelo Category.

export const createCategory = async (req: Request, res: Response) => {
  const { name, permissions } = req.body; // Extraemos datos del cuerpo de la solicitud.
  
  try {
    const category = new Category({ name, permissions }); // Creamos una nueva instancia de Category.
    await category.save(); // Guardamos la categoría en la base de datos.
    res.status(201).json(category); // Respondemos con la categoría creada.
  } catch (error: any) {
    res.status(400).json({ error: error.message }); // Respondemos con un mensaje de error.
  }
};