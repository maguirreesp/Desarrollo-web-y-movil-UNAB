import { Router } from 'express';
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../controllers/productos.controller.js';

import {
  requerirRol
} from '../middleware/identity.js';

const router = Router();

// Lecturas: permitidas para usuarios autenticados
router.get('/', listarProductos);
router.get('/:id', obtenerProducto);

// Modificaciones: solo administradores
router.post(
  '/',
  requerirRol('admin'),
  crearProducto
);

router.put(
  '/:id',
  requerirRol('admin'),
  actualizarProducto
);

router.delete(
  '/:id',
  requerirRol('admin'),
  eliminarProducto
);

export default router;