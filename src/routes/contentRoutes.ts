//@ts-ignore
const express = require('express');
const contentRoutes = express.Router();
const content = require('../controllers/contentController');

/**
 * @swagger
 * tags:
 *   name: Content
 *   description: API para gestionar contenido
 */

/**
 * @swagger
 * /content:
 *   post:
 *     tags: [Content]
 *     summary: Crear un nuevo contenido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del contenido
 *                 example: "Mi primer video"
 *               category:
 *                 type: string
 *                 description: ID de la categoría a la que pertenece el contenido
 *                 example: "60d5ec49f1a2c8b1f8c8e4a1"
 *               user:
 *                 type: string
 *                 description: ID del usuario que creó el contenido
 *                 example: "60d5ec49f1a2c8b1f8c8e4a2"
 *               type:
 *                 type: string
 *                 enum: [image, video, text]
 *                 description: Tipo de contenido
 *                 example: "video"
 *               url:
 *                 type: string
 *                 description: URL donde se encuentra el contenido
 *                 example: "http://example.com/video.mp4"
 *     responses:
 *       201:
 *         description: Contenido creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
contentRoutes.post('/content', content.createContent);

/**
 * @swagger
 * /content:
 *   get:
 *     tags: [Content]
 *     summary: Obtener todo el contenido
 *     responses:
 *       200:
 *         description: Lista de contenido
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del contenido
 *                   title:
 *                     type: string
 *                     description: Título del contenido
 *                   category:
 *                     type: string
 *                     description: ID de la categoría
 *                   user:
 *                     type: string
 *                     description: ID del usuario
 *                   type:
 *                     type: string
 *                     enum: [image, video, text]
 *                     description: Tipo de contenido
 *                   url:
 *                     type: string
 *                     description: URL del contenido
 */
contentRoutes.get('/content', content.getAllContent);

/**
 * @swagger
 * /content/{id}:
 *   get:
 *     tags: [Content]
 *     summary: Obtener un contenido por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contenido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del contenido
 *                 title:
 *                   type: string
 *                   description: Título del contenido
 *                 category:
 *                   type: string
 *                   description: ID de la categoría
 *                 user:
 *                   type: string
 *                   description: ID del usuario
 *                 type:
 *                   type: string
 *                   enum: [image, video, text]
 *                   description: Tipo de contenido
 *                 url:
 *                   type: string
 *                   description: URL del contenido
 *       404:
 *         description: Contenido no encontrado
 */
contentRoutes.get('/content/:id', content.getContentById);

/**
 * @swagger
 * /content/{id}:
 *   put:
 *     tags: [Content]
 *     summary: Actualizar un contenido por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo título del contenido
 *                 example: "Mi video actualizado"
 *               category:
 *                 type: string
 *                 description: ID de la nueva categoría
 *                 example: "60d5ec49f1a2c8b1f8c8e4a1"
 *               user:
 *                 type: string
 *                 description: ID del usuario que actualiza el contenido
 *                 example: "60d5ec49f1a2c8b1f8c8e4a2"
 *               type:
 *                 type: string
 *                 enum: [image, video, text]
 *                 description: Nuevo tipo de contenido
 *                 example: "text"
 *               url:
 *                 type: string
 *                 description: Nueva URL del contenido
 *                 example: "http://example.com/nuevo_video.mp4"
 *     responses:
 *       200:
 *         description: Contenido actualizado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Contenido no encontrado
 */
contentRoutes.put('/content/:id', content.updateContent);

/**
 * @swagger
 * /content/{id}:
 *   delete:
 *     tags: [Content]
 *     summary: Eliminar un contenido por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Contenido eliminado exitosamente
 *       404:
 *         description: Contenido no encontrado
 */
contentRoutes.delete('/content/:id', content.deleteContent);

module.exports = contentRoutes;