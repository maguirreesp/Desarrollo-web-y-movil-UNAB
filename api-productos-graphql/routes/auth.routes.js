import { Router } from 'express';
import { generarTokens } from '../middleware/auth.js';

const router = Router();

router.post('/login', (req, res) => {
  const { usuario, clave } = req.body;

  if (usuario !== 'admin' || clave !== '1234') {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const tokens = generarTokens({ usuario });
  res.status(200).json(tokens);
});

export default router;
