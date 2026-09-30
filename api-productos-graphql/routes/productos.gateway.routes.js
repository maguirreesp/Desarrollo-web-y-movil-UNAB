import "dotenv/config";

import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Router } from "express";

import {
  cargarSecretosVault
} from "../services/vault.js";

const router = Router();

const BACKEND_URL =
  process.env.BACKEND_PRODUCTOS_URL
  || "http://localhost:5000";

const JWT_SECRET =
  process.env.JWT_SECRET
  || "clave-secreta-dev";

/*
 * El Gateway consulta Vault directamente
 * al iniciarse.
 */
const {
  clientToken,
  backendSharedSecret
} = await cargarSecretosVault();

console.log(
  "[gateway] Secretos cargados desde Vault"
);

function compararSeguro(
  recibido,
  esperado
) {
  if (!recibido || !esperado) {
    return false;
  }

  const hashRecibido =
    crypto
      .createHash("sha256")
      .update(recibido)
      .digest();

  const hashEsperado =
    crypto
      .createHash("sha256")
      .update(esperado)
      .digest();

  return crypto.timingSafeEqual(
    hashRecibido,
    hashEsperado
  );
}

/*
 * Permite dos mecanismos:
 *
 * 1. client_token almacenado en Vault
 * 2. JWT que ya utilizaba el proyecto
 *
 * Así no rompemos el frontend existente.
 */
function verificarCliente(
  req,
  res,
  next
) {
  const authorization =
    req.headers.authorization;

  if (
    !authorization
    || !authorization.startsWith(
      "Bearer "
    )
  ) {
    return res.status(401).json({
      error:
        "Token de autorización requerido"
    });
  }

  const token =
    authorization.substring(7);

  /*
   * Primero comprobamos el token
   * de cliente almacenado en Vault.
   */
  if (
    compararSeguro(
      token,
      clientToken
    )
  ) {
    req.authType =
      "vault-client-token";

    return next();
  }

  /*
   * Si no corresponde al token de Vault,
   * comprobamos si es un JWT válido.
   */
  jwt.verify(
    token,
    JWT_SECRET,
    (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({
            error:
              "Token inválido"
          });
      }

      req.usuario =
        decoded;

      req.authType =
        "jwt";

      next();
    }
  );
}

router.use(
  verificarCliente
);

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

        /*
         * Este valor viene directamente
         * desde Vault.
         */
        "X-Gateway-Secret":
          backendSharedSecret
      }
    };

    if (
      ["POST", "PUT"].includes(
        req.method
      )
    ) {
      opciones.body =
        JSON.stringify(
          req.body
        );
    }

    const respuesta =
      await fetch(
        `${BACKEND_URL}${path}`,
        opciones
      );

    if (
      respuesta.status === 204
    ) {
      return res
        .status(204)
        .send();
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

    return res
      .status(502)
      .json({
        error:
          "Backend no disponible"
      });
  }
}

router.get(
  "/",
  (req, res) => {
    const query =
      new URLSearchParams(
        req.query
      ).toString();

    reenviar(
      req,
      res,
      `/productos${
        query
          ? `?${query}`
          : ""
      }`
    );
  }
);

router.get(
  "/:id",
  (req, res) => {
    reenviar(
      req,
      res,
      `/productos/${req.params.id}`
    );
  }
);

router.post(
  "/",
  (req, res) => {
    reenviar(
      req,
      res,
      "/productos"
    );
  }
);

router.put(
  "/:id",
  (req, res) => {
    reenviar(
      req,
      res,
      `/productos/${req.params.id}`
    );
  }
);

router.delete(
  "/:id",
  (req, res) => {
    reenviar(
      req,
      res,
      `/productos/${req.params.id}`
    );
  }
);

export default router;