# Tarea 1: Diseño Responsivo - Grid System 12 Columnas

## Descripción: Página web responsiva con grid system de 12 columnas que se adapta a 3 breakpoints.

## Características

- Grid system 12 columnas con CSS Grid
- Responsividad en 3 tamaños (desktop, tablet, mobile)
- Navegación horizontal
- Sección hero centrada
- 3 tarjetas con estilos profesionales

## Criterios de Aceptación

- Funciona en desktop (3 tarjetas lado a lado)
- Funciona en tablet (2 tarjetas + 1 abajo)
- Funciona en mobile (1 columna apilada)
- Colores: azul oscuro, celeste, lila, blanco
- Estilos: bordes redondeados, sombras, padding

# Tarea 2: Sitio Web Responsivo con Bootstrap

## Descripción

Sitio web responsivo con navbar colapsable, modal de autenticación, router de páginas e imágenes.

## Características

- ✅ Navbar responsiva con Bootstrap (colapsa en mobile)
- ✅ Dropdown "Empresa" con submenu
- ✅ Modal de autenticación funcional
- ✅ 5 páginas con router (index, empresa, productos, servicios, contacto)
- ✅ Imágenes en todas las páginas
- ✅ Estilos personalizados (azul oscuro, celeste, lila)

## Tecnologías

- Bootstrap 5.3
- HTML5
- CSS3

## Cómo ejecutar

1. Abre `index.html` en el navegador
2. Prueba navegación en desktop y mobile
3. Clickea "Acceder" para ver el modal

## Archivos

- `index.html` - Página principal
- `empresa.html` - Sección empresa
- `productos.html` - Sección productos
- `servicios.html` - Sección servicios
- `contacto.html` - Sección contacto
- `styles.css` - Estilos personalizados
- `img/` - Carpeta de imágenes

# Tarea 3: Aplicación Web Interactiva

## Descripción

Aplicación web dinámica que incorpora interacción mediante JavaScript y reutiliza la estructura responsiva y los componentes desarrollados en las tareas anteriores.

## Características

- ✅ Interacciones dinámicas con JavaScript
- ✅ Validación de formularios
- ✅ Consumo y presentación de datos
- ✅ Diseño responsivo compatible con desktop, tablet y mobile
- ✅ Integración con la navegación y estilos de la Tarea 2

## Tecnologías

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3

# Tarea 4: Prototipo en Sketch y Paleta de Colores en CSS

## Descripción

Se agrega un prototipo visual en Sketch junto con la definición de una paleta de colores aplicada en CSS para mantener coherencia visual en el proyecto.

## Características

- ✅ Prototipo en Sketch con estructura y elementos de interfaz
- ✅ Paleta de colores definida en CSS
- ✅ Aplicación visual consistente en componentes y secciones
- ✅ Uso de colores corporativos para diseño web profesional

## Tecnologías

- Sketch
- HTML5
- CSS3

# Tarea 5: API GraphQL de productos con Apollo Server, Express y MongoDB

## Descripción

Integración de una API GraphQL para consultar y presentar datos de forma dinámica en la aplicación web.

## Características

- ✅ Consultas mediante GraphQL
- ✅ Consumo y presentación de datos dinámicos
- ✅ Integración con la aplicación web responsiva

## Tecnologías

- GraphQL
- .env
- Docker
- JSON
- Node.js

# Tarea 6: API REST con Gateway, Autenticación JWT y Estados HTTP

## Descripción del avance

En este PR se implementa la capa de API REST pública con ciberdefensa y manejo estricto de protocolos.

## Características

- Rutas y controladores REST.
- Operaciones CRUD con respuestas de códigos HTTP estándar (`200 OK`, `201 Created`).
- Validaciones de seguridad y errores:
    - Manejo explícito de `400 Bad Request` para IDs sintácticamente inválidos.
    - Manejo explícito de `404 Not Found` para recursos no encontrados.
- Autenticación y CORS:
    - Generación y revocación de tokens de acceso mediante JWT.
    - Configuración de políticas CORS para controlar el acceso a la API.

# Tarea 7: Frontend Web con JavaScript e Interactividad

## Descripción del avance

En este PR se implementa el frontend de la aplicación a partir del prototipo visual previamente diseñado, utilizando HTML, CSS y JavaScript para construir una interfaz responsive e interactiva.

El objetivo de esta tarea es transformar el diseño estático en una interfaz funcional del lado del cliente, sin depender de un backend para las interacciones principales.

# Características
- Implementación del diseño visual del prototipo.
- Estructura de la interfaz mediante HTML.
- Estilos, distribución y diseño responsive mediante CSS.
- Uso de JavaScript para agregar comportamiento dinámico a la página.
- Navegación entre las distintas secciones del sitio.
- Adaptación de la interfaz para dispositivos de escritorio y móviles.
- Interactividad mediante JavaScript:
- Filtrado de pizzas según su categoría.
- Búsqueda dinámica de productos por nombre o descripción.
- Menú de navegación responsive para dispositivos móviles.
- Animaciones de aparición de elementos mediante IntersectionObserver.
- Actualización dinámica de componentes sin necesidad de recargar la página.
- Manejo de eventos mediante addEventListener().

# Gestión del pedido:
- Botones para añadir productos al pedido.
- Aumento y disminución de cantidades.
- Cálculo automático del total.
- Visualización del pedido mediante un panel interactivo.
- Confirmación simulada del pedido desde el frontend.
- Manejo del estado mediante URL:
- Uso de URLSearchParams para leer parámetros desde la URL.
- Uso de history.pushState() y history.replaceState() para actualizar la URL sin recargar la página.
- Conservación de filtros, búsquedas y productos seleccionados mediante parámetros URL.

# Tarea 8: Gestor de Secretos con Vault y API Securitizada

## Descripción del avance

# Caracteristicas:
- Integración de HashiCorp Vault para gestionar secretos internos.
- Uso de X-Gateway-Secret entre el API Gateway y el backend.
- Autenticación de clientes mediante JWT.
- Protección del backend contra accesos directos no autorizados.
- Validación segura del secreto interno.
- Implementación del endpoint protegido /health.
- Pruebas de acceso con respuestas 403 Forbidden y 200 OK.
- Configuración para impedir que los servicios inicien si falta el secreto requerido.