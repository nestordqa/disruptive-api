import mongoose, { Document, Schema } from 'mongoose';

// Definimos la interfaz ICategory que extiende de Document de Mongoose.
// Esta interfaz describe la estructura de una categoría en la base de datos.
export interface ICategory extends Document {
  name: string; // Nombre de la categoría, debe ser único.
  permissions: { // Permisos asociados a la categoría.
    images: boolean; // Permiso para imágenes, es un valor booleano.
    videos: boolean; // Permiso para videos, es un valor booleano.
    texts: boolean; // Permiso para textos, es un valor booleano.
  };
}

// Creamos el esquema de Mongoose para el modelo de categoría.
const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true }, // El nombre es un campo requerido y debe ser único.
  permissions: { // Objeto de permisos que contiene los campos de permisos.
    images: { type: Boolean, default: false }, // Permiso para imágenes, por defecto es falso.
    videos: { type: Boolean, default: false }, // Permiso para videos, por defecto es falso.
    texts: { type: Boolean, default: false } // Permiso para textos, por defecto es falso.
  }
});

// Exportamos el modelo de categoría, que se puede utilizar para interactuar con la colección 'Category' en la base de datos.
export default mongoose.model<ICategory>('Category', CategorySchema);