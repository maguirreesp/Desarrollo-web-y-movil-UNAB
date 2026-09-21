import {
  iniciarSesion,
  obtenerProductos
} from './api.js';

async function cargarProductos() {
  try {
    const productos = await obtenerProductos();

    console.log('Productos recibidos:', productos);
  } catch (error) {
    console.error(error.message);
  }
}

async function loginPrueba() {
  try {
    await iniciarSesion('admin', '1234');

    console.log('Sesión iniciada');

    await cargarProductos();
  } catch (error) {
    console.error(error.message);
  }
}

loginPrueba();