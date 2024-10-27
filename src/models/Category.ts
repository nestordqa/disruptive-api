import mongoose, { Document, Schema } from 'mongoose';

// Definimos la interfaz ICategory que extiende de Document de Mongoose.
// Esta interfaz describe la estructura de una categoría en la base de datos.
export interface ICategory extends Document {
  name: string; // Nombre de la categoría, debe ser único.
}

// Creamos el esquema de Mongoose para el modelo de categoría.
const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true }, // El nombre es un campo requerido y debe ser único.
});

// Exportamos el modelo de categoría, que se puede utilizar para interactuar con la colección 'Category' en la base de datos.
export default mongoose.model<ICategory>('Category', CategorySchema);