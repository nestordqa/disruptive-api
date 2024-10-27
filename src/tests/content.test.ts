import { Request, Response } from 'express';
import Content from '../models/Content';
import {
    createContent,
    getAllContent,
    getContentById,
    updateContent,
    deleteContent
} from '../controllers/contentController'; // Asegúrate de que la ruta sea correcta

jest.mock('../models/Content'); // Simula el modelo Content

describe('Controlador de Contenido', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let json: jest.Mock;
    let status: jest.Mock;

    beforeEach(() => {
        json = jest.fn();
        status = jest.fn().mockReturnValue({ json });
        req = { body: {}, params: {} };
        res = { status };
    });

    describe('createContent', () => {
        it('debería retornar un error si faltan campos requeridos', async () => {
            req.body = { title: 'Título', category: 'Categoría' }; // Faltan otros campos
            await createContent(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({ error: 'Todos los campos son requeridos.' });
        });

        it('debería retornar un error si el tipo es inválido', async () => {
            req.body = { title: 'Título', category: 'Categoría', user: 'Usuario', type: 'invalidType', url: 'http://example.com' };
            await createContent(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({ error: 'El tipo debe ser uno de: image, video, text.' });
        });
    });

    describe('updateContent', () => {

        it('debería retornar un 404 si el contenido no se encuentra', async () => {
            //@ts-ignore
            req.params.id = '123';
            req.body = { title: 'Título actualizado', category: 'Categoría', user: 'Usuario', type: 'image', url: 'http://example.com' };
            (Content.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

            await updateContent(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(404);
            expect(json).toHaveBeenCalledWith({ error: 'Contenido no encontrado' });
        });

        it('debería retornar un error si faltan campos requeridos', async () => {
            //@ts-ignore
            req.params.id = '123';
            req.body = { title: 'Título actualizado' }; // Faltan otros campos
            await updateContent(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({ error: 'Todos los campos son requeridos.' });
        });

        it('debería retornar un error si el tipo es inválido', async () => {
            //@ts-ignore
            req.params.id = '123';
            req.body = { title: 'Título actualizado', category: 'Categoría', user: 'Usuario', type: 'invalidType', url: 'http://example.com' };
            await updateContent(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({ error: 'El tipo debe ser uno de: image, video, text.' });
        });
    });

    describe('deleteContent', () => {
        it('debería retornar un 404 si el contenido no se encuentra', async () => {
            //@ts-ignore
            req.params.id = '123';
            (Content.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

            await deleteContent(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(404);
            expect(json).toHaveBeenCalledWith({ error: 'Contenido no encontrado' });
        });
    });
});