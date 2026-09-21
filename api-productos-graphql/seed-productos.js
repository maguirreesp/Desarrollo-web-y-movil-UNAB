const API_URL = "http://localhost:4000/api";

const productos = [
  {
    nombre: "Margherita Fornace",
    precio: 9900,
    stock: 20,
    descripcion:
      "Salsa de tomate San Marzano, mozzarella fior di latte, albahaca fresca y un hilo de oliva extra virgen.",
    categoria: "clasica"
  },
  {
    nombre: "Diavola",
    precio: 12500,
    stock: 15,
    descripcion:
      "Salame picante, mozzarella, tomate y un toque de miel para equilibrar el fuego del horno.",
    categoria: "picante"
  },
  {
    nombre: "Funghi Tartufo",
    precio: 13900,
    stock: 12,
    descripcion:
      "Champiñones salteados, mozzarella, rúcula y lascas de parmesano con aceite de trufa.",
    categoria: "vegetariana"
  },
  {
    nombre: "Napoletana",
    precio: 11900,
    stock: 14,
    descripcion:
      "Tomate, mozzarella, anchoas, alcaparras y aceitunas negras. El sabor del sur de Italia.",
    categoria: "del mar"
  },
  {
    nombre: "Basilico",
    precio: 12900,
    stock: 18,
    descripcion:
      "Pesto de albahaca casero, mozzarella, tomates cherry confitados y piñones tostados.",
    categoria: "vegetariana"
  },
  {
    nombre: "Quattro Formaggi",
    precio: 13500,
    stock: 10,
    descripcion:
      "Mozzarella, gorgonzola, fontina y parmesano sobre base bianca con nueces.",
    categoria: "sin tomate"
  }
];

async function iniciarSesion() {
  const respuesta = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario: "admin",
        clave: "1234"
      })
    }
  );

  if (!respuesta.ok) {
    throw new Error(
      `Error de login: ${respuesta.status}`
    );
  }

  const data = await respuesta.json();

  return data.accessToken;
}

async function crearProducto(
  token,
  producto
) {
  const respuesta = await fetch(
    `${API_URL}/productos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(producto)
    }
  );

  const data = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      `Error creando ${producto.nombre}: `
      + JSON.stringify(data)
    );
  }

  return data;
}

async function main() {
  try {
    console.log(
      "Iniciando sesión..."
    );

    const token =
      await iniciarSesion();

    console.log(
      "Sesión iniciada correctamente."
    );

    for (
      const producto
      of productos
    ) {
      const creado =
        await crearProducto(
          token,
          producto
        );

      console.log(
        `Creado: ${creado.nombre}`
      );
    }

    console.log(
      "Todos los productos fueron creados."
    );
  } catch (error) {
    console.error(
      "Error:",
      error.message
    );
  }
}

main();
