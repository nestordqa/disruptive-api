//@ts-ignore
const express = require('express');
const categoryRoutes = express.Router();
const category = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API para gestionar categorías
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: Crear una nueva categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *                 example: "Electrónica"
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
categoryRoutes.post('/categories', category.createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Obtener todas las categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la categoría
 *                   name:
 *                     type: string
 *                     description: Nombre de la categoría
 *                     example: "Electrónica"
 */
categoryRoutes.get('/categories', category.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Obtener una categoría por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la categoría
 *                 name:
 *                   type: string
 *                   description: Nombre de la categoría
 *                   example: "Electrónica"
 *       404:
 *         description: Categoría no encontrada
 */

categoryRoutes.get('/categories/:id', category.getCategoryById);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Actualizar una categoría por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre de la categoría
 *                 example: "Electrodomésticos"
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Categoría no encontrada
 */
categoryRoutes.put('/categories/:id', category.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Eliminar una categoría por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: Categoría no encontrada
 */
categoryRoutes.delete('/categories/:id', category.deleteCategory);

module.exports = categoryRoutes;