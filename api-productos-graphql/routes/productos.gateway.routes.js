import 'dotenv/config';
import { Router } from 'express';
import { verificarToken } from '../middleware/auth.js';

const router = Router();
const BACKEND_URL = process.env.BACKEND_PRODUCTOS_URL || 'http://localhost:5000';
const GATEWAY_SECRET = process.env.GATEWAY_SECRET || 'secreto-interno-dev';

router.use(verificarToken); // el Gateway valida al cliente ANTES de reenviar

async function reenviar(req, res, path) {
  try {
    const opciones = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'x-gateway-secret': GATEWAY_SECRET // token interno, nunca el del cliente
      }
    };
    if (['POST', 'PUT'].includes(req.method)) {
      opciones.body = JSON.stringify(req.body);
    }

    const respuesta = await fetch(`${BACKEND_URL}${path}`, opciones);

    if (respuesta.status === 204) {
      return res.status(204).send();
    }
    const data = await respuesta.json();
    res.status(respuesta.status).json(data);
  } catch (error) {
    res.status(502).json({ error: 'Backend no disponible' }); // el backend está caído
  }
}

router.get('/', (req, res) => {
  const query = new URLSearchParams(req.query).toString();
  reenviar(req, res, `/productos${query ? '?' + query : ''}`);
});
router.get('/:id', (req, res) => reenviar(req, res, `/productos/${req.params.id}`));
router.post('/', (req, res) => reenviar(req, res, '/productos'));
router.put('/:id', (req, res) => reenviar(req, res, `/productos/${req.params.id}`));
router.delete('/:id', (req, res) => reenviar(req, res, `/productos/${req.params.id}`));

export default router;