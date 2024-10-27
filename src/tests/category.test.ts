const { request } = require('supertest');
import { afterEach, it, describe, expect, jest } from '@jest/globals';
import { getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController';
import Category from '../models/Category';

jest.mock('../models/Category'); // Mockear el modelo Category

describe('Category Controller', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Limpiar mocks después de cada prueba
    });
  
    describe('getAllCategories', () => {
      it('debería obtener todas las categorías', async () => {
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const categories = [{ name: 'Category 1' }, { name: 'Category 2' }];
        //@ts-ignore
        (Category.find as jest.Mock).mockResolvedValue(categories);
  //@ts-ignore
        await getAllCategories(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(categories);
      });
  
      it('debería devolver un error si falla la obtención', async () => {
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        //@ts-ignore
        (Category.find as jest.Mock).mockRejectedValue(new Error('Error al obtener categorías'));
        //@ts-ignore  
        await getAllCategories(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener categorías' });
      });
    });
  
    describe('getCategoryById', () => {
      it('debería obtener una categoría por ID', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const category = { name: 'Category 1' };
        //@ts-ignore
        (Category.findById as jest.Mock).mockResolvedValue(category);
  //@ts-ignore
        await getCategoryById(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(category);
      });
  
      it('debería devolver un error si la categoría no se encuentra', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        //@ts-ignore
        (Category.findById as jest.Mock).mockResolvedValue(null);
  //@ts-ignore
        await getCategoryById(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Categoría no encontrada' });
      });
  
      it('debería devolver un error si falla la obtención', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        //@ts-ignore
        (Category.findById as jest.Mock).mockRejectedValue(new Error('Error al obtener categoría'));
  //@ts-ignore
        await getCategoryById(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener categoría' });
      });
    });
  
    describe('updateCategory', () => {
      it('debería actualizar una categoría por ID', async () => {
        const req = { params: { id: '1' }, body: { name: 'Updated Category' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        //@ts-ignore
        (Category.findByIdAndUpdate as jest.Mock).mockResolvedValue(req.body);
  //@ts-ignore
        await updateCategory(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(req.body);
      });
  
      it('debería devolver un error si la categoría no se encuentra', async () => {
        const req = { params: { id: '1' }, body: { name: 'Updated Category' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        //@ts-ignore
        (Category.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
  //@ts-ignore
        await updateCategory(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Categoría no encontrada' });
      });
  
      it('debería devolver un error si falla la actualización', async () => {
        const req = { params: { id: '1' }, body: { name: 'Updated Category' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        //@ts-ignore
        (Category.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Error al actualizar'));
  //@ts-ignore
        await updateCategory(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al actualizar' });
      });
    });
  
    describe('deleteCategory', () => {
      it('debería eliminar una categoría', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        //@ts-ignore
        (Category.findByIdAndDelete as jest.Mock).mockResolvedValue({ name: 'Category to delete' });
        //@ts-ignore  
        await deleteCategory(req, res);
  
        expect(res.status).toHaveBeenCalledWith(204);
      });
  
      it('debería devolver un error si la categoría no se encuentra', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        //@ts-ignore
        (Category.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
        //@ts-ignore  
        await deleteCategory(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Categoría no encontrada' });
      });
  
      it('debería devolver un error si falla la eliminación', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        //@ts-ignore
        (Category.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Error al eliminar'));
  //@ts-ignore
        await deleteCategory(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al eliminar' });
      });
    });
  });