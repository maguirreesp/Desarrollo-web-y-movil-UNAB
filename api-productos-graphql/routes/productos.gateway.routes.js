import "dotenv/config";
import { Router } from "express";

import {
  cargarSecretosVault
} from "../services/vault.js";

const router = Router();

const BACKEND_URL =
  process.env.BACKEND_PRODUCTOS_URL ||
  "http://localhost:5000";

const OUT_SERVICE_URL =
  process.env.OUT_SERVICE_URL ||
  "http://localhost:8100";

const {
  backendSharedSecret,
  gatewayOutSecret
} = await cargarSecretosVault();

async function introspectarToken(
  req,
  res,
  next
) {
  const authorization =
    req.get("Authorization");

  if (
    !authorization ||
    !authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      error:
        "Token de autorización requerido"
    });
  }

  const token =
    authorization
      .substring(7)
      .trim();

  try {
    const respuesta = await fetch(
      `${OUT_SERVICE_URL}/introspect`,
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

    if (!respuesta.ok) {
      return res.status(502).json({
        error:
          "Error al consultar el servicio de autenticación"
      });
    }

    const data =
      await respuesta.json();

    if (!data.active) {
      return res.status(401).json({
        error:
          "Token inválido o expirado"
      });
    }

    if (!data.username) {
      return res.status(502).json({
        error:
          "Respuesta inválida del servicio de autenticación"
      });
    }

    req.identidad = {
      user_id: data.user_id,
      username: data.username,
      roles:
        Array.isArray(data.roles)
          ? data.roles
          : []
    };

    next();

  } catch (error) {
    console.error(
      "[gateway] Introspección fallida:",
      error.message
    );

    return res.status(503).json({
      error:
        "Servicio de autenticación no disponible"
    });
  }
}

router.use(introspectarToken);

async function reenviar(
  req,
  res,
  path
) {
  try {
    const opciones = {
      method: req.method,

      headers: {
        "Content-Type":
          "application/json",

        "X-Gateway-Secret":
          backendSharedSecret,

        "X-Authenticated-User":
          req.identidad.username,

        "X-Authenticated-Roles":
          req.identidad.roles.join(",")
      }
    };

    if (
      ["POST", "PUT"].includes(
        req.method
      )
    ) {
      opciones.body =
        JSON.stringify(req.body);
    }

    const respuesta = await fetch(
      `${BACKEND_URL}${path}`,
      opciones
    );

    if (respuesta.status === 204) {
      return res.status(204).send();
    }

    const data =
      await respuesta.json();

    return res
      .status(respuesta.status)
      .json(data);

  } catch (error) {
    console.error(
      "[gateway] Backend no disponible:",
      error.message
    );

    return res.status(502).json({
      error: "Backend no disponible"
    });
  }
}

router.get("/", (req, res) => {
  const query =
    new URLSearchParams(
      req.query
    ).toString();

  reenviar(
    req,
    res,
    `/productos${query ? `?${query}` : ""}`
  );
});

router.get("/:id", (req, res) => {
  reenviar(
    req,
    res,
    `/productos/${req.params.id}`
  );
});

router.post("/", (req, res) => {
  reenviar(
    req,
    res,
    "/productos"
  );
});

router.put("/:id", (req, res) => {
  reenviar(
    req,
    res,
    `/productos/${req.params.id}`
  );
});

router.delete("/:id", (req, res) => {
  reenviar(
    req,
    res,
    `/productos/${req.params.id}`
  );
});

export default router;