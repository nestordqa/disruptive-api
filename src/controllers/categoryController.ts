import { Request, Response } from 'express';
import Category from '../models/Category';

//Crear nueva categoria
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  const { name, permissions } = req.body;

  try {
    const category = new Category({ name, permissions });
    await category.save();
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

//Obtener todas las categorias
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//Obtener categoria por ID
export const getCategoryById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//Actualiza categoria por el ID
export const updateCategory = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, permissions } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, { name, permissions }, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json(updatedCategory);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

//Elimina la categoria
export const deleteCategory = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};