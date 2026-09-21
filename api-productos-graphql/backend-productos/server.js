import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productosRoutes from '../routes/productos.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

const GATEWAY_SECRET = process.env.GATEWAY_SECRET || 'secreto-interno-dev';

// Solo el Gateway conoce este secreto — bloquea llamadas directas de clientes
app.use((req, res, next) => {
  if (req.headers['x-gateway-secret'] !== GATEWAY_SECRET) {
    return res.status(403).json({ error: 'Acceso directo no permitido' });
  }
  next();
});

app.use('/productos', productosRoutes);

await mongoose.connect(process.env.MONGO_URI);
console.log('[backend-productos] Conectado a MongoDB');

const PUERTO = process.env.PORT_BACKEND || 5000;
app.listen(PUERTO, () => {
  console.log(`[backend-productos] Escuchando en http://localhost:${PUERTO} (privado)`);
});