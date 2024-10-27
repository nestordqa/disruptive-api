const { Request, Response }  = require('express');
import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Chequea que se haya levantado la API.
exports.checkApi = async (req: any, res: any) => {
    res.status(200).json({ message: 'May the force be with you 🌟👊🏼' });
    return;
};

// Registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
    //@ts-ignore
  const { alias, email, password, role } = req.body;

  try {
    // Validación de datos
    if (!alias || !email || !role || !password) {
        //@ts-ignore
        res.status(400).json({ message: 'Todos los campos son requeridos.' });
        return;
    }
    // Realiza un hash de la contraseña para garantizar la seguridad
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ alias, email, password: hashedPassword, role });
    await user.save();
    //@ts-ignore
    res.status(201).json(user);
  } catch (error: any) {
    //@ts-ignore
    res.status(400).json({ error: error.message });
  }
};

// Leer todos los usuarios
export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await User.find();
        //@ts-ignore
        res.status(200).json(users);
    } catch (error) {
        //@ts-ignore
        res.status(500).json({ message: 'Error al obtener los usuarios.', error });
    }
};
  
// Leer un usuario por ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        //@ts-ignore
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
        //@ts-ignore
        res.status(404).json({ message: 'Usuario no encontrado.' });
        return;
        }
        //@ts-ignore
        res.status(200).json(user);
    } catch (error) {
        //@ts-ignore
        res.status(500).json({ message: 'Error al obtener el usuario.', error });
    }
};
  
// Actualizar un usuario por ID
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        //@ts-ignore
        const { id } = req.params;
        //@ts-ignore
        const updateData: Partial<IUser> = req.body;

        // Validación de datos
        if (!updateData.alias && !updateData.email && !updateData.role) {
        //@ts-ignore
        res.status(400).json({ message: 'Al menos un campo debe ser actualizado.' });
        return;
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!user) {
        //@ts-ignore
        res.status(404).json({ message: 'Usuario no encontrado.' });
        return;
        }
        //@ts-ignore
        res.status(200).json(user);
    } catch (error) {
        //@ts-ignore
        res.status(500).json({ message: 'Error al actualizar el usuario.', error });
    }
};
  
  // Eliminar un usuario por ID
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        //@ts-ignore
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
        //@ts-ignore
        res.status(404).json({ message: 'Usuario no encontrado.' });
        return;
        }
        //@ts-ignore
        res.status(204).send(); // No content
    } catch (error) {
        //@ts-ignore
        res.status(500).json({ message: 'Error al eliminar el usuario.', error });
    }
};  

// Realizar logueo
export const loginUser = async (req: Request, res: Response) => {
    //@ts-ignore
    const { email, password } = req.body;

    if (!email || !password) {
        //@ts-ignore
        return res.status(400).json({ message: 'Faltan parámetros en la peticion' });
    }

    // Busca el usuario en la DB
    const user = await User.findOne({ email });
    if (!user) {
        //@ts-ignore
        return res.status(401).json({ message: 'No existe el usuario' });
    }

    // Compara la contraseña ingresada con la hasheada en la DB
    //@ts-ignore
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        //@ts-ignore
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Crea el JWT con expiración de una hora
    //@ts-ignore
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.DISRUPTIVE_API, { expiresIn: '1h' });
    //@ts-ignore
    res.json({ token });
};

//Create admin principal
export const createAdminUser = async () => {
    try {

        // Verificar si ya existe un usuario admin
        const adminExists = await User.findOne({ role: 'admin' });

        if (adminExists) {
            await User.findByIdAndDelete(adminExists.id);
            console.log('Usuario eliminado, creando nuevamente...');
        }
        const pass = await bcrypt.hash('Admin123456*', 10);
        // Crear un nuevo usuario admin
        const adminUser: IUser = new User({
        alias: 'admin',
        email: 'admin@admin.com',
        role: 'admin',
        password: pass
        });

        await adminUser.save();
        console.log('Usuario admin creado exitosamente.');
    } catch (error) {
        console.error('Error al crear el usuario admin:', error);
    }
  };