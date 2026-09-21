import "dotenv/config";

import { Router } from "express";

import {
  verificarToken
} from "../middleware/auth.js";

const router = Router();

const BACKEND_URL =
  process.env.BACKEND_PRODUCTOS_URL
  || "http://localhost:5000";

const INTERNAL_GATEWAY_SECRET =
  process.env.INTERNAL_GATEWAY_SECRET;

/*
 * El Gateway tampoco debe iniciar sin
 * el secreto interno.
 */
if (!INTERNAL_GATEWAY_SECRET) {
  throw new Error(
    "Falta la variable INTERNAL_GATEWAY_SECRET"
  );
}

/*
 * El cliente primero debe superar
 * la autenticación JWT.
 */
router.use(verificarToken);

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
          INTERNAL_GATEWAY_SECRET
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
      "[gateway] Error:",
      error.message
    );

    return res.status(502).json({
      error: "Backend no disponible"
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

    const path =
      `/productos${
        query
          ? `?${query}`
          : ""
      }`;

    reenviar(
      req,
      res,
      path
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