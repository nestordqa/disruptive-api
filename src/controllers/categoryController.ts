import { Request, Response } from 'express';
import Category from '../models/Category';

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

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};