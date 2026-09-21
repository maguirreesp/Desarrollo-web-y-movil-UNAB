# La Fornace — versión Vanilla JavaScript

Esta versión conserva la apariencia del frontend original hecho con React/Tailwind, pero elimina React, TypeScript, Vite y Supabase.

## Tecnologías

- HTML5
- CSS (se reutiliza el CSS compilado del diseño original para mantener la apariencia)
- JavaScript puro / Vanilla JS

No requiere Node, npm, backend, base de datos ni servidor.

## Archivos

```text
la-fornace-js/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Cómo ejecutar

Abre `index.html` con un navegador.

También se puede usar Live Server en VS Code si se desea, pero no es obligatorio.

## Interactividad implementada con JavaScript

- Menú móvil.
- Navbar reactivo al scroll.
- Animaciones de aparición con `IntersectionObserver`.
- Filtros de pizzas.
- Buscador en tiempo real.
- Carrito/pedido interactivo.
- Aumentar y disminuir cantidades.
- Total calculado automáticamente.
- Confirmación simulada del pedido.
- Toasts de confirmación.
- Estado sincronizado con la URL mediante `URLSearchParams` y `history.replaceState/pushState`.

Ejemplo de URL:

```text
index.html?categoria=Vegetariana&buscar=basil&pedido=margherita:1,diavola:2#menu
```

La URL permite conservar filtros, búsqueda y pedido sin utilizar backend ni `localStorage`.

## Nota

Las fotografías siguen siendo las mismas URLs externas de Pexels del frontend original para conservar el aspecto visual.
