const express = require('express');
const userRoutes = express.Router();

const user = require('../controllers/userController');

//Ruta para verificar funcionamiento de la API
userRoutes.get('/', user.checkApi);

//Ruta para el registro de usuarios
//@ts-ignore
userRoutes.post('/register', user.registerUser);

// Ruta para obtener todos los usuarios
//@ts-ignore
userRoutes.get('/users', user.getAllUsers);

// Ruta para obtener un usuario por ID
//@ts-ignore
userRoutes.get('/users/:id', user.getUserById);

// Ruta para actualizar un usuario por ID
//@ts-ignore
userRoutes.put('/users/:id', user.updateUserById);

// Ruta para eliminar un usuario por ID
//@ts-ignore
userRoutes.delete('/users/:id', user.deleteUserById);

//@ts-ignore
userRoutes.post('/login', user.loginUser);

module.exports = userRoutes;