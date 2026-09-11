import { isValidObjectId } from 'mongoose';
import Producto from '../models/Producto.js';

export async function listarProductos(req, res) {
  const { q, skip = 0, limit = 50 } = req.query;
  const limiteSeguro = Math.min(Number(limit), 200);

  const filtro = {};
  if (q) {
    filtro.nombre = { $regex: q, $options: 'i' };
  }

  const productos = await Producto.find(filtro).skip(Number(skip)).limit(limiteSeguro);
  res.status(200).json(productos);
}

export async function obtenerProducto(req, res) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const producto = await Producto.findById(id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(200).json(producto);
}

export async function crearProducto(req, res) {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function actualizarProducto(req, res) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const producto = await Producto.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(200).json(producto);
}

export async function eliminarProducto(req, res) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const producto = await Producto.findByIdAndDelete(id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(204).send();
}

