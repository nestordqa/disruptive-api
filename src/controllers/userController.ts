import { Request, Response } from 'express'; // Importing Request and Response types from Express
import User, { IUser } from '../models/User'; // Importing the User model for database operations
import bcrypt from 'bcryptjs'; // Importing bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Importing jsonwebtoken for creating JWTs

// Registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
  const { alias, email, password, role } = req.body;

  try {
    // Validación de datos
    if (!alias || !email || !role || !password) {
        res.status(400).json({ message: 'Todos los campos son requeridos.' });
        return;
    }
    // Realiza un hash de la contraseña para garantizar la seguridad
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ alias, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Leer todos los usuarios
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios.', error });
    }
};
  
// Leer un usuario por ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado.' });
        return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario.', error });
    }
};
  
// Actualizar un usuario por ID
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updateData: Partial<IUser> = req.body;

        // Validación de datos
        if (!updateData.alias && !updateData.email && !updateData.role) {
        res.status(400).json({ message: 'Al menos un campo debe ser actualizado.' });
        return;
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado.' });
        return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario.', error });
    }
};
  
  // Eliminar un usuario por ID
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado.' });
        return;
        }

        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario.', error });
    }
};
  

// Realizar logueo
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Busca el usuario en la DB
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Compara la contraseña ingresada con la hasheada en la DB
  //@ts-ignore
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Crea el JWT con expiración de una hora
  //@ts-ignore
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.DISRUPTIVE_API, { expiresIn: '1h' });
  res.json({ token });
};