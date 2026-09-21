const API_URL = 'http://localhost:4000/api';

function guardarToken(token) {
  localStorage.setItem('accessToken', token);
}

function obtenerToken() {
  return localStorage.getItem('accessToken');
}

function eliminarToken() {
  localStorage.removeItem('accessToken');
}

async function iniciarSesion(usuario, clave) {
  const respuesta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      usuario,
      clave
    })
  });

  const data = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(data.error || 'Error al iniciar sesión');
  }

  guardarToken(data.accessToken);

  return data;
}

async function obtenerProductos() {
  const token = obtenerToken();

  const respuesta = await fetch(`${API_URL}/productos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(data.error || 'Error al obtener productos');
  }

  return data;
}

async function obtenerProducto(id) {
  const token = obtenerToken();

  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(data.error || 'Error al obtener producto');
  }

  return data;
}

async function crearProducto(producto) {
  const token = obtenerToken();

  const respuesta = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(producto)
  });

  const data = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(data.error || 'Error al crear producto');
  }

  return data;
}

async function actualizarProducto(id, producto) {
  const token = obtenerToken();

  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(producto)
  });

  const data = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(data.error || 'Error al actualizar producto');
  }

  return data;
}

async function eliminarProducto(id) {
  const token = obtenerToken();

  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (respuesta.status === 204) {
    return;
  }

  const data = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(data.error || 'Error al eliminar producto');
  }

  return data;
}

export {
  iniciarSesion,
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  guardarToken,
  obtenerToken,
  eliminarToken
};