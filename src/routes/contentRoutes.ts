//@ts-ignore
const express = require('express');
const contentRoutes = express.Router();
const content = require('../controllers/contentController');

// Endpoint to create a new content
contentRoutes.post('/content', content.createContent);

// Endpoint to get all content
contentRoutes.get('/content', content.getAllContent);

// Endpoint to get a content by ID
contentRoutes.get('/content/:id', content.getContentById);

// Endpoint to update a content by ID
contentRoutes.put('/content/:id', content.updateContent);

// Endpoint to delete a content by ID
contentRoutes.delete('/content/:id', content.deleteContent);

module.exports = contentRoutes;