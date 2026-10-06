import crypto from "crypto";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT_OUT || 8100;

const TOKEN_LIFETIME_SECONDS =
  Number(process.env.TOKEN_LIFETIME_SECONDS || 900);

const GATEWAY_OUT_SECRET =
  process.env.GATEWAY_OUT_SECRET;

if (!GATEWAY_OUT_SECRET) {
  throw new Error(
    "Falta la variable GATEWAY_OUT_SECRET"
  );
}

const usuarios = {
  cliente: {
    user_id: "user-001",
    username: "cliente",
    password: "cliente123",
    roles: ["user"]
  },

  admin: {
    user_id: "admin-001",
    username: "admin",
    password: "1234",
    roles: ["admin"]
  }
};

const sesiones = new Map();

function compararSeguro(valorA, valorB) {
  if (!valorA || !valorB) {
    return false;
  }

  const hashA = crypto
    .createHash("sha256")
    .update(valorA)
    .digest();

  const hashB = crypto
    .createHash("sha256")
    .update(valorB)
    .digest();

  return crypto.timingSafeEqual(
    hashA,
    hashB
  );
}

function verificarGateway(req, res, next) {
  const secreto =
    req.get("X-Gateway-Out-Secret");

  if (
    !compararSeguro(
      secreto,
      GATEWAY_OUT_SECRET
    )
  ) {
    return res.status(403).json({
      error:
        "Solicitud no autorizada desde gateway"
    });
  }

  next();
}

app.post("/login", (req, res) => {
  const {
    username,
    password
  } = req.body;

  const usuario =
    usuarios[username];

  if (
    !usuario ||
    !compararSeguro(
      password,
      usuario.password
    )
  ) {
    return res.status(401).json({
      error: "Credenciales inválidas"
    });
  }

  const accessToken =
    crypto
      .randomBytes(32)
      .toString("hex");

  const expiresAt =
    Date.now()
    + TOKEN_LIFETIME_SECONDS * 1000;

  sesiones.set(
    accessToken,
    {
      user_id: usuario.user_id,
      username: usuario.username,
      roles: usuario.roles,
      expiresAt
    }
  );

  return res.status(200).json({
    access_token: accessToken,
    token_type: "bearer",
    expires_in:
      TOKEN_LIFETIME_SECONDS,
    user_id: usuario.user_id,
    username: usuario.username,
    roles: usuario.roles
  });
});

app.post(
  "/introspect",
  verificarGateway,
  (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(200).json({
        active: false
      });
    }

    const sesion =
      sesiones.get(token);

    if (!sesion) {
      return res.status(200).json({
        active: false
      });
    }

    if (
      Date.now()
      >= sesion.expiresAt
    ) {
      sesiones.delete(token);

      return res.status(200).json({
        active: false
      });
    }

    return res.status(200).json({
      active: true,
      user_id: sesion.user_id,
      username: sesion.username,
      roles: sesion.roles
    });
  }
);

app.post(
  "/logout",
  verificarGateway,
  (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        error: "Token requerido"
      });
    }

    sesiones.delete(token);

    return res.status(200).json({
      message:
        "Sesión cerrada correctamente"
    });
  }
);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "out-service"
  });
});

app.listen(PORT, () => {
  console.log(
    `[out-service] Escuchando en http://localhost:${PORT}`
  );
});