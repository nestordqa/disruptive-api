import mongoose, { Document, Schema } from 'mongoose';

// Definimos la interfaz IUser que extiende de Document de Mongoose.
// Esta interfaz describe la estructura de un usuario en la base de datos.
export interface IUser extends Document {
  alias: string; // Alias del usuario, debe ser único.
  email: string; // Correo electrónico del usuario, también debe ser único.
  role: 'lector' | 'creador' | 'admin'; // Rol del usuario, puede ser 'lector', 'creador' o 'admin'.
  password: string
}

// Creamos el esquema de Mongoose para el modelo de usuario.
const UserSchema: Schema = new Schema({
  alias: { type: String, required: true, unique: true }, // El alias es un campo requerido y debe ser único.
  email: { type: String, required: true, unique: true }, // El correo electrónico es un campo requerido y debe ser único.
  role: { type: String, enum: ['lector', 'creador', 'admin'], required: true }, // El rol es un campo requerido y debe ser uno de los valores especificados en el enum.
  password: { type: String, required: true }
});

// Exportamos el modelo de usuario, que se puede utilizar para interactuar con la colección 'User' en la base de datos.
export default mongoose.model<IUser>('User', UserSchema);