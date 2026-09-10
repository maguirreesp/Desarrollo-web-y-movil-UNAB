import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  precio: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  descripcion: { type: String, default: '' },
  categoria: { type: String, default: 'general' },
  fechaCreacion: { type: Date, default: Date.now }
});

export default mongoose.model('Producto', productoSchema);