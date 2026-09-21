import crypto from "crypto";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import productosRoutes from "../routes/productos.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

const INTERNAL_GATEWAY_SECRET =
  process.env.INTERNAL_GATEWAY_SECRET;

/*
 * El backend no puede arrancar si no existe
 * el secreto interno.
 */
if (!INTERNAL_GATEWAY_SECRET) {
  throw new Error(
    "Falta la variable INTERNAL_GATEWAY_SECRET"
  );
}

/*
 * Compara ambos secretos de forma segura.
 * Primero genera un SHA-256 para obtener
 * buffers del mismo tamaño.
 */
function compararSecretos(recibido, esperado) {
  if (!recibido || !esperado) {
    return false;
  }

  const hashRecibido = crypto
    .createHash("sha256")
    .update(recibido)
    .digest();

  const hashEsperado = crypto
    .createHash("sha256")
    .update(esperado)
    .digest();

  return crypto.timingSafeEqual(
    hashRecibido,
    hashEsperado
  );
}

/*
 * Middleware que comprueba que la petición
 * venga realmente desde el Gateway.
 */
function verificarGateway(req, res, next) {
  const secretoRecibido =
    req.get("X-Gateway-Secret");

  const valido = compararSecretos(
    secretoRecibido,
    INTERNAL_GATEWAY_SECRET
  );

  if (!valido) {
    return res.status(403).json({
      error:
        "Solicitud no autorizada desde gateway"
    });
  }

  next();
}

/*
 * Todos los endpoints posteriores quedan
 * protegidos por el secreto interno.
 */
app.use(verificarGateway);

/*
 * Endpoint solicitado en el ejercicio.
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "backend-productos"
  });
});

app.use(
  "/productos",
  productosRoutes
);

await mongoose.connect(
  process.env.MONGO_URI
);

console.log(
  "[backend-productos] Conectado a MongoDB"
);

const PUERTO =
  process.env.PORT_BACKEND || 5000;

app.listen(PUERTO, () => {
  console.log(
    `[backend-productos] Escuchando en http://localhost:${PUERTO}`
  );
});