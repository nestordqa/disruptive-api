import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import {
    registerUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser
} from '../controllers/userController'; // Asegúrate de que la ruta sea correcta

jest.mock('../models/User'); // Simula el modelo User
jest.mock('bcryptjs'); // Simula bcrypt
jest.mock('jsonwebtoken'); // Simula jwt

describe('User Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let json: jest.Mock;
    let status: jest.Mock;

    beforeEach(() => {
        json = jest.fn();
        status = jest.fn().mockReturnValue({ json });
        req = { body: {}, params: {}, query: {} };
        res = { status };
    });

    describe('registerUser', () => {

        it('debería retornar un error si faltan parametros password y role', async () => {
            req.body = { alias: 'test', email: 'test@example.com' }; // Missing password and role
            //@ts-ignore
            await registerUser(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({ message: 'Todos los campos son requeridos.' });
        });
    });

    describe('getAllUsers', () => {
        it('debería retornar todos los usuarios', async () => {
            const users = [{ alias: 'test', email: 'test@example.com' }];
            (User.find as jest.Mock).mockResolvedValue(users);
            //@ts-ignore
            await getAllUsers(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith(users);
        });

        it('debería retornar un error si hay problemas haciendo el fetching de los usuarios', async () => {
            (User.find as jest.Mock).mockRejectedValue(new Error('Database error'));
            //@ts-ignore
            await getAllUsers(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(500);
            expect(json).toHaveBeenCalledWith({ message: 'Error al obtener los usuarios.', error: expect.any(Error) });
        });
    });

    describe('getUserById', () => {
        it('debería retornar un usuario por ID', async () => {
            //@ts-ignore
            req.params.id = '123';
            const user = { alias: 'test', email: 'test@example.com' };
            (User.findById as jest.Mock).mockResolvedValue(user);
            //@ts-ignore
            await getUserById(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith(user);
        });

        it('debería retornar 404 si no se encuentra el usuario', async () => {
            //@ts-ignore
            req.params.id = '123';
            (User.findById as jest.Mock).mockResolvedValue(null);
            //@ts-ignore
            await getUserById(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(404);
            expect(json).toHaveBeenCalledWith({ message: 'Usuario no encontrado.' });
        });
    });

    describe('updateUserById', () => {
        it('debería actualizar un usuario por ID', async () => {
            //@ts-ignore
            req.params.id = '123';
            req.body = { alias: 'updatedAlias' };
            const updatedUser = { alias: 'updatedAlias', email: 'test@example.com' };
            (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);
            //@ts-ignore
            await updateUserById(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith(updatedUser);
        });

        it('debería retornar un 400 si no hay campos que actualizar', async () => {
            //@ts-ignore
            req.params.id = '123';
            req.body = {}; // No fields to update
            //@ts-ignore
            await updateUserById(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({ message: 'Al menos un campo debe ser actualizado.' });
        });
    });

    describe('deleteUserById', () => {

        it('debería retornar 404 si no se eucuentra el usuario', async () => {
            //@ts-ignore
            req.params.id = '123';
            (User.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
            //@ts-ignore
            await deleteUserById(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(404);
            expect(json).toHaveBeenCalledWith({ message: 'Usuario no encontrado.' });
        });
    });

    describe('loginUser', () => {

        it('debería retornar 401 si las credenciales son inválidas', async () => {
            req.body = { email: 'test@example.com', password: 'wrongPassword' };
            (User.findOne as jest.Mock).mockResolvedValue({ password: 'hashedPassword' });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);
            //@ts-ignore
            await loginUser(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(401);
            expect(json).toHaveBeenCalledWith({ message: 'Credenciales inválidas' });
        });
    });
});