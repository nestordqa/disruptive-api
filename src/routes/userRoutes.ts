//@ts-ignore
const express = require('express');
const userRoutes = express.Router();

const user = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [User]
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alias:
 *                 type: string
 *                 description: Alias del usuario, debe ser único.
 *                 example: "usuario123"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario, debe ser único.
 *                 example: "usuario@example.com"
 *               role:
 *                 type: string
 *                 enum: [lector, creador, admin]
 *                 description: Rol del usuario.
 *                 example: "creador"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: "contraseñaSegura123"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: Error en la solicitud.
 */
userRoutes.post('/register', user.registerUser);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   alias:
 *                     type: string
 *                     description: Alias del usuario.
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario.
 *                   role:
 *                     type: string
 *                     enum: [lector, creador, admin]
 *                     description: Rol del usuario.
 *                   password:
 *                     type: string
 *                     description: Contraseña del usuario.
 */
userRoutes.get('/users', user.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [User]
 *     summary: Obtener un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alias:
 *                   type: string
 *                   description: Alias del usuario.
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario.
 *                 role:
 *                   type: string
 *                   enum: [lector, creador, admin]
 *                   description: Rol del usuario.
 *                 password:
 *                   type: string
 *                   description: Contraseña del usuario.
 *       404:
 *         description: Usuario no encontrado.
 */
userRoutes.get('/users/:id', user.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [User]
 *     summary: Actualizar un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alias:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [lector, creador, admin]
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       400:
 *         description: Error en la solicitud.
 *       404:
 *         description: Usuario no encontrado.
 */
userRoutes.put('/users/:id', user.updateUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Eliminar un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */
userRoutes.delete('/users/:id', user.deleteUserById);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [User]
 *     summary: Iniciar sesión de un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: "contraseñaSegura123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación del usuario.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciales inválidas.
 *       400:
 *         description: Error en la solicitud.
 */
userRoutes.post('/login', user.loginUser);

module.exports = userRoutes;