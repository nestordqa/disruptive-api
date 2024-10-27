import { Request, Response } from 'express'; // Importamos Request y Response de Express.
import Content from '../models/Content'; // Importamos el modelo Content.

//Crea nuevo contenido
export const createContent = async (req: Request, res: Response): Promise<any> => {
  const { title, category, user, type, url } = req.body;

  // Valida que se reciban todos los datos
  if (!title || !category || !user || !type || !url) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  if (!['image', 'video', 'text'].includes(type)) {
    return res.status(400).json({ error: 'El tipo debe ser uno de: image, video, text.' });
  }

  try {
    const content = new Content({ title, category, user, type, url });
    await content.save();
    res.status(201).json(content);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

//Obtiene todo el contenido cargado en la DB
export const getAllContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const contentList = await Content.find().populate('category user'); // Populate category and user details
    res.status(200).json(contentList);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener el contenido: ' + error.message });
  }
};

//Obtiene un contenido por ID
export const getContentById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const content = await Content.findById(id).populate('category user');
    if (!content) {
      return res.status(404).json({ error: 'Contenido no encontrado' });
    }
    res.status(200).json(content);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener el contenido: ' + error.message });
  }
};

//Actualiza un contenido por ID
export const updateContent = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { title, category, user, type, url } = req.body;

  // Valida que existan los datos
  if (!title || !category || !user || !type || !url) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  if (!['image', 'video', 'text'].includes(type)) {
    return res.status(400).json({ error: 'El tipo debe ser uno de: image, video, text.' });
  }

  try {
    const updatedContent = await Content.findByIdAndUpdate(id, { title, category, user, type, url }, { new: true });
    if (!updatedContent) {
      return res.status(404).json({ error: 'Contenido no encontrado' });
    }
    res.status(200).json(updatedContent);
  } catch (error: any) {
    res.status(400).json({ error: 'Error al actualizar el contenido: ' + error.message });
  }
};

//Elimina un contenido por ID
export const deleteContent = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const deletedContent = await Content.findByIdAndDelete(id);
    if (!deletedContent) {
      return res.status(404).json({ error: 'Contenido no encontrado' });
    }
    res.status(204).send(); // No content
  } catch (error: any) {
    res.status(500).json({ error: 'Error al eliminar el contenido: ' + error.message });
  }
};