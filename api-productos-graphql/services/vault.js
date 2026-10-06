import "dotenv/config";

const VAULT_ADDR =
  process.env.VAULT_ADDR ||
  "http://127.0.0.1:8200";

const VAULT_TOKEN =
  process.env.VAULT_TOKEN;

if (!VAULT_TOKEN) {
  throw new Error(
    "Falta la variable VAULT_TOKEN"
  );
}

export async function cargarSecretosVault() {
  const respuesta = await fetch(
    `${VAULT_ADDR}/v1/secret/data/gateway`,
    {
      headers: {
        "X-Vault-Token": VAULT_TOKEN
      }
    }
  );

  if (!respuesta.ok) {
    throw new Error(
      `No se pudieron obtener los secretos de Vault: ${respuesta.status}`
    );
  }

  const resultado =
    await respuesta.json();

  const secretos =
    resultado?.data?.data;

  if (
    !secretos?.backend_shared_secret ||
    !secretos?.gateway_out_secret
  ) {
    throw new Error(
      "Vault no contiene los secretos requeridos"
    );
  }

  return {
    backendSharedSecret:
      secretos.backend_shared_secret,

    gatewayOutSecret:
      secretos.gateway_out_secret
  };
}