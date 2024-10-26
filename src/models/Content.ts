import mongoose, { Document, Schema } from 'mongoose';

// Definimos la interfaz IContent que extiende de Document de Mongoose.
// Esta interfaz describe la estructura de un contenido en la base de datos.
export interface IContent extends Document {
  title: string; // Título del contenido.
  category: string; // ID de la categoría a la que pertenece el contenido.
  user: string; // ID del usuario que creó el contenido.
  type: 'image' | 'video' | 'text'; // Tipo de contenido, puede ser 'image', 'video' o 'text'.
  url: string; // URL donde se encuentra el contenido.
}

// Creamos el esquema de Mongoose para el modelo de contenido.
const ContentSchema: Schema = new Schema({
  title: { type: String, required: true }, // El título es un campo requerido.
  category: { type: Schema.Types.ObjectId, ref: 'Category' }, // Referencia a la categoría, usando ObjectId.
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // Referencia al usuario, usando ObjectId.
  type: { type: String, enum: ['image', 'video', 'text'], required: true }, // El tipo es un campo requerido y debe ser uno de los valores especificados en el enum.
  url: { type: String, required: true } // La URL es un campo requerido.
});

// Exportamos el modelo de contenido, que se puede utilizar para interactuar con la colección 'Content' en la base de datos.
export default mongoose.model<IContent>('Content', ContentSchema);