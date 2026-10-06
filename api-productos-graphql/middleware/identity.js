export function cargarIdentidad(req, res, next) {
  const username =
    req.get("X-Authenticated-User");

  const rolesHeader =
    req.get("X-Authenticated-Roles");

  if (!username || !rolesHeader) {
    return res.status(403).json({
      error: "Identidad autenticada ausente"
    });
  }

  const roles = rolesHeader
    .split(",")
    .map(rol => rol.trim())
    .filter(Boolean);

  req.auth = {
    username,
    roles
  };

  console.log(
    `[backend] ${req.method} ${req.originalUrl} usuario=${username} roles=${roles.join(",")}`
  );

  next();
}

export function requerirRol(rolRequerido) {
  return (req, res, next) => {
    if (
      !req.auth?.roles?.includes(rolRequerido)
    ) {
      return res.status(403).json({
        error: `Operación restringida al rol ${rolRequerido}`
      });
    }

    next();
  };
}