//@ts-ignore
const express = require('express');
const categoryRoutes = express.Router();
const category = require('../controllers/categoryController');

// Route para crear nueva categoria
categoryRoutes.post('/categories', category.createCategory);

// Ruta para obtener todas las categorias
categoryRoutes.get('/categories', category.getAllCategories);

// Ruta para obtener una categoria por ID
categoryRoutes.get('/categories/:id', category.getCategoryById);

// Ruta para actualizar una categoria por ID
categoryRoutes.put('/categories/:id', category.updateCategory);

// Ruta para eliminar una categoria por ID
categoryRoutes.delete('/categories/:id', category.deleteCategory);

module.exports = categoryRoutes;