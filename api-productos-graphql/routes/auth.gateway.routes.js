import "dotenv/config";
import { Router } from "express";

import {
  cargarSecretosVault
} from "../services/vault.js";

const router = Router();

const OUT_SERVICE_URL =
  process.env.OUT_SERVICE_URL ||
  "http://localhost:8100";

const {
  gatewayOutSecret
} = await cargarSecretosVault();

router.post("/login", async (req, res) => {
  try {
    const username =
      req.body.username ??
      req.body.usuario;

    const password =
      req.body.password ??
      req.body.clave;

    const respuesta = await fetch(
      `${OUT_SERVICE_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    );

    const data =
      await respuesta.json();

    // Compatibilidad con el frontend anterior
    if (data.access_token) {
      data.accessToken =
        data.access_token;
    }

    return res
      .status(respuesta.status)
      .json(data);

  } catch (error) {
    console.error(
      "[gateway] out-service no disponible:",
      error.message
    );

    return res.status(503).json({
      error:
        "Servicio de autenticación no disponible"
    });
  }
});

router.post("/logout", async (req, res) => {
  const authorization =
    req.get("Authorization");

  if (
    !authorization ||
    !authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      error: "Token requerido"
    });
  }

  const token =
    authorization
      .substring(7)
      .trim();

  try {
    const respuesta = await fetch(
      `${OUT_SERVICE_URL}/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",

          "X-Gateway-Out-Secret":
            gatewayOutSecret
        },
        body: JSON.stringify({
          token
        })
      }
    );

    const data =
      await respuesta.json();

    return res
      .status(respuesta.status)
      .json(data);

  } catch (error) {
    return res.status(503).json({
      error:
        "Servicio de autenticación no disponible"
    });
  }
});

export default router;