import {
  iniciarSesion,
  obtenerProductos
} from "./js/api.js";


console.log("[La Fornace] app.js cargado");

(() => {
  "use strict";

  let menu = [];

  const staticMenu = [
  {
    id: "margherita",
    name: "Margherita Fornace",
    description:
      "Salsa de tomate San Marzano, mozzarella fior di latte, albahaca fresca y un hilo de oliva extra virgen.",
    price: 9900,
    stock: 20,
    tags: ["Clásica"],
    image:
      "https://images.pexels.com/photos/28945103/pexels-photo-28945103.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    popular: true
  },
  {
    id: "diavola",
    name: "Diavola",
    description:
      "Salame picante, mozzarella, tomate y un toque de miel para equilibrar el fuego del horno.",
    price: 12500,
    stock: 15,
    tags: ["Picante"],
    image:
      "https://images.pexels.com/photos/28866020/pexels-photo-28866020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    popular: true
  },
  {
    id: "funghi",
    name: "Funghi Tartufo",
    description:
      "Champiñones salteados, mozzarella, rúcula y lascas de parmesano con aceite de trufa.",
    price: 13900,
    stock: 12,
    tags: ["Vegetariana"],
    image:
      "https://images.pexels.com/photos/29021737/pexels-photo-29021737.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    popular: false
  },
  {
    id: "napoletana",
    name: "Napoletana",
    description:
      "Tomate, mozzarella, anchoas, alcaparras y aceitunas negras. El sabor del sur de Italia.",
    price: 11900,
    stock: 14,
    tags: ["Del mar"],
    image:
      "https://images.pexels.com/photos/29021734/pexels-photo-29021734.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    popular: false
  },
  {
    id: "basilico",
    name: "Basilico",
    description:
      "Pesto de albahaca casero, mozzarella, tomates cherry confitados y piñones tostados.",
    price: 12900,
    stock: 18,
    tags: ["Vegetariana"],
    image:
      "https://images.pexels.com/photos/15550301/pexels-photo-15550301.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    popular: false
  },
  {
    id: "quattro",
    name: "Quattro Formaggi",
    description:
      "Mozzarella, gorgonzola, fontina y parmesano sobre base bianca con nueces.",
    price: 13500,
    stock: 10,
    tags: ["Sin tomate"],
    image:
      "https://images.pexels.com/photos/28945102/pexels-photo-28945102.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    popular: false
  }
];

  const fallbackImages = [
    "https://images.pexels.com/photos/28945103/pexels-photo-28945103.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/28866020/pexels-photo-28866020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/29021737/pexels-photo-29021737.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/29021734/pexels-photo-29021734.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/15550301/pexels-photo-15550301.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/28945102/pexels-photo-28945102.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ];

  const galleryImages = [
    "https://images.pexels.com/photos/13736876/pexels-photo-13736876.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/14496014/pexels-photo-14496014.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/13193300/pexels-photo-13193300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/14520444/pexels-photo-14520444.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/35819050/pexels-photo-35819050.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/29626982/pexels-photo-29626982.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ];

  const testimonials = [
    {
      name: "María Fernández",
      role: "Cliente desde 2021",
      text: "La masa es ligera y crocante, exactamente como la que probé en Nápoles. El delivery llegó caliente y en tiempo récord."
    },
    {
      name: "Diego Salinas",
      role: "Pedidos semanales",
      text: "La Diavola es adictiva. El toque de miel la hace única. Pido todos los viernes para la familia y nunca falla."
    },
    {
      name: "Lucía Romero",
      role: "Fan de la Margherita",
      text: "Se nota la fermentación lenta en cada bocado. Ingredientes frescos, atención impecable y un packaging que cuida la pizza."
    }
  ];

  let filters = ["Todas"];

  const svg = {
    flame:
      '<path d="M12 2c.6 3.5-1.7 5.3-3.1 7.1C7.7 10.6 7 12 7 14a5 5 0 0 0 10 0c0-2.7-1.5-5.2-4.2-7.8.1 2.4-1.1 3.6-2.1 4.4C10.9 7.9 11.8 5.4 12 2Z"/>',

    star:
      '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"/>',

    timer:
      '<path d="M10 2h4M12 14l3-3"/><circle cx="12" cy="14" r="7"/><path d="M12 7V5"/>',

    wheat:
      '<path d="M2 22 16 8M3.5 15H8V10.5M7 11H3V7M10.5 8H7V4.5M14 9.5V5h4.5M13 6h4V2M16 13h4v-4"/>',

    leaf:
      '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 18 2 18 2c1 7-1.5 12-7 14"/><path d="M2 21c0-3 1.85-5.36 5.08-6.94C9.54 12.85 12.4 12 16 12"/>',

    clock:
      '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',

    truck:
      '<path d="M10 17h4V5H2v12h3"/><path d="M14 9h4l4 4v4h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>',

    search:
      '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',

    plus:
      '<path d="M12 5v14M5 12h14"/>',

    quote:
      '<path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h3c0 4-1 5-4 6v2Zm11 0c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h3c0 4-1 5-4 6v2Z"/>',

    bike:
      '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 17.5 12 10H8l-2.5 7.5M12 10l3-4h3M8 10l-2-3h3"/>',

    phone:
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"/>',

    map:
      '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',

    instagram:
      '<rect width="18" height="18" x="3" y="3" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',

    facebook:
      '<path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1Z"/>',

    menu:
      '<path d="M4 6h16M4 12h16M4 18h16"/>',

    x:
      '<path d="m6 6 12 12M18 6 6 18"/>'
  };

  const state = {
    filter: "Todas",
    query: "",
    cart: {}
  };

  const el = (id) => document.getElementById(id);

  function iconMarkup(name, extra = "") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="${extra}"
        aria-hidden="true"
      >
        ${svg[name] || ""}
      </svg>
    `;
  }

  function hydrateIcons(root = document) {
    root.querySelectorAll("[data-icon]").forEach((node) => {
      const name = node.getAttribute("data-icon");
      const className = node.getAttribute("class") || "";

      node.outerHTML = iconMarkup(
        name,
        className
      );
    });
  }

  function money(value) {
    return new Intl.NumberFormat(
      "es-CL",
      {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
      }
    ).format(value);
  }

  function formatCategory(value) {
    const text = String(
      value || "general"
    ).trim();

    if (!text) {
      return "General";
    }

    return (
      text.charAt(0).toUpperCase()
      + text.slice(1).toLowerCase()
    );
  }

  async function loadMenu() {
  const esLocal =
    window.location.hostname === "localhost"
    || window.location.hostname === "127.0.0.1";

  if (!esLocal) {
    menu = staticMenu;

    filters = [
      "Todas",
      ...new Set(
        menu.flatMap((item) => item.tags)
      )
    ];

    console.log(
      "Modo GitHub Pages: menú estático cargado"
    );

    return;
  }

  await iniciarSesion(
    "admin",
    "1234"
  );

  const productos =
    await obtenerProductos();

  menu = productos.map(
    (producto, index) => ({
      id: producto._id,
      name: producto.nombre,
      description:
        producto.descripcion
        || "Pizza artesanal de La Fornace.",
      price:
        Number(producto.precio),
      stock:
        Number(producto.stock ?? 0),
      tags: [
        formatCategory(
          producto.categoria
        )
      ],
      image:
        fallbackImages[
          index
          % fallbackImages.length
        ],
      popular: false
    })
  );

  filters = [
    "Todas",
    ...new Set(
      menu.flatMap(
        (item) => item.tags
      )
    )
  ];

  console.log(
    "Modo local: productos cargados desde la API",
    menu
  );
}

  function parseCart(raw) {
    const cart = {};

    if (!raw) {
      return cart;
    }

    raw.split(",").forEach((pair) => {
      const [id, qtyText] =
        pair.split(":");

      const qty =
        Number(qtyText);

      const item =
        menu.find(
          (product) =>
            product.id === id
        );

      if (
        item
        && Number.isInteger(qty)
        && qty > 0
      ) {
        cart[id] = Math.min(
          qty,
          item.stock,
          20
        );
      }
    });

    return cart;
  }

  function cartToParam() {
    return Object.entries(
      state.cart
    )
      .filter(
        ([, qty]) => qty > 0
      )
      .map(
        ([id, qty]) =>
          `${id}:${qty}`
      )
      .join(",");
  }

  function readStateFromUrl() {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const requestedFilter =
      params.get("categoria");

    state.filter =
      filters.includes(
        requestedFilter
      )
        ? requestedFilter
        : "Todas";

    state.query =
      params.get("buscar") || "";

    state.cart =
      parseCart(
        params.get("pedido")
      );
  }

  function syncUrl({
    replace = true
  } = {}) {
    const url =
      new URL(
        window.location.href
      );

    if (
      state.filter !== "Todas"
    ) {
      url.searchParams.set(
        "categoria",
        state.filter
      );
    } else {
      url.searchParams.delete(
        "categoria"
      );
    }

    if (
      state.query.trim()
    ) {
      url.searchParams.set(
        "buscar",
        state.query.trim()
      );
    } else {
      url.searchParams.delete(
        "buscar"
      );
    }

    const cartParam =
      cartToParam();

    if (cartParam) {
      url.searchParams.set(
        "pedido",
        cartParam
      );
    } else {
      url.searchParams.delete(
        "pedido"
      );
    }

    const method =
      replace
        ? "replaceState"
        : "pushState";

    history[method](
      {},
      "",
      url
    );
  }

  function renderFilters() {
    el(
      "menu-filters"
    ).innerHTML =
      filters
        .map(
          (filter) => `
            <button
              type="button"
              data-filter="${filter}"
              class="
                rounded-full
                px-4
                py-2
                text-sm
                font-medium
                transition-all
                duration-300
                ${
                  state.filter
                  === filter
                    ? "bg-wine-700 text-cream-50 shadow-md"
                    : "bg-cream-50 text-wine-700 hover:bg-wine-700/10"
                }
              "
            >
              ${filter}
            </button>
          `
        )
        .join("");
  }

  function filteredMenu() {
    const q =
      state.query
        .trim()
        .toLowerCase();

    return menu.filter(
      (item) => {
        const tagOk =
          state.filter
            === "Todas"
          || item.tags.includes(
            state.filter
          );

        const queryOk =
          !q
          || item.name
            .toLowerCase()
            .includes(q)
          || item.description
            .toLowerCase()
            .includes(q);

        return (
          tagOk
          && queryOk
        );
      }
    );
  }

  function renderMenu() {
    const items =
      filteredMenu();

    el(
      "menu-grid"
    ).innerHTML =
      items
        .map(
          (item, index) => `
            <article
              class="
                reveal
                is-visible
                menu-card-enter
                group
                overflow-hidden
                rounded-3xl
                bg-cream-50
                shadow-lg
                shadow-wine-900/5
                ring-1
                ring-wine-700/5
                transition-all
                duration-500
                hover:-translate-y-1.5
                hover:shadow-2xl
                hover:shadow-wine-900/10
              "
              style="
                animation-delay:
                ${index * 45}ms
              "
            >
              <div
                class="
                  relative
                  aspect-[4/3]
                  overflow-hidden
                "
              >
                <img
                  src="${item.image}"
                  alt="${item.name}"
                  class="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                ${
                  item.popular
                    ? `
                      <span
                        class="
                          absolute
                          left-4
                          top-4
                          rounded-full
                          bg-crust-500
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-cream-50
                          shadow
                        "
                      >
                        Más pedida
                      </span>
                    `
                    : ""
                }
              </div>

              <div class="p-6">
                <div
                  class="
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
                >
                  <h3
                    class="
                      font-display
                      text-xl
                      font-bold
                      text-wine-900
                    "
                  >
                    ${item.name}
                  </h3>

                  <span
                    class="
                      whitespace-nowrap
                      font-display
                      text-xl
                      font-bold
                      text-crust-600
                    "
                  >
                    ${money(item.price)}
                  </span>
                </div>

                <p
                  class="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-wine-800/75
                  "
                >
                  ${item.description}
                </p>

                <div
                  class="
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  ${
                    item.tags
                      .map(
                        (tag) => `
                          <span
                            class="
                              rounded-full
                              bg-cream-200
                              px-3
                              py-1
                              text-xs
                              font-medium
                              text-wine-700
                            "
                          >
                            ${tag}
                          </span>
                        `
                      )
                      .join("")
                  }
                </div>

                <button
                  class="
                    btn-primary
                    mt-5
                    w-full
                  "
                  type="button"
                  data-add="${item.id}"
                  ${
                    item.stock <= 0
                      ? "disabled"
                      : ""
                  }
                  style="${
                    item.stock <= 0
                      ? "opacity:.5;cursor:not-allowed"
                      : ""
                  }"
                >
                  ${
                    item.stock <= 0
                      ? "Sin stock"
                      : `
                        ${iconMarkup(
                          "plus",
                          "h-4 w-4"
                        )}
                        Añadir al pedido
                      `
                  }
                </button>
              </div>
            </article>
          `
        )
        .join("");

    el("menu-empty").hidden =
      items.length !== 0;
  }

  function renderGallery() {
    el(
      "gallery-grid"
    ).innerHTML =
      galleryImages
        .map(
          (src, i) => {
            const big =
              i === 0
              || i === 5;

            return `
              <div
                class="
                  reveal
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  ${
                    big
                      ? "col-span-2 row-span-2"
                      : ""
                  }
                "
                style="
                  transition-delay:
                  ${i * 70}ms
                "
              >
                <img
                  src="${src}"
                  alt="
                    Galería La Fornace
                    ${i + 1}
                  "
                  class="
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                    ${
                      big
                        ? "h-full min-h-[220px]"
                        : "aspect-square"
                    }
                  "
                />

                <div
                  class="
                    absolute
                    inset-0
                    bg-wine-950/0
                    transition-colors
                    duration-500
                    group-hover:bg-wine-950/20
                  "
                ></div>
              </div>
            `;
          }
        )
        .join("");
  }

  function renderTestimonials() {
    el(
      "testimonials-grid"
    ).innerHTML =
      testimonials
        .map(
          (item, i) => `
            <figure
              class="
                reveal
                relative
                rounded-3xl
                border
                border-wine-700/10
                bg-cream-100/60
                p-8
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-xl
                hover:shadow-wine-900/5
              "
              style="
                transition-delay:
                ${i * 90}ms
              "
            >
              ${iconMarkup(
                "quote",
                "h-8 w-8 text-crust-400/60"
              )}

              <div
                class="
                  mt-3
                  flex
                  gap-0.5
                "
              >
                ${
                  Array
                    .from({
                      length: 5
                    })
                    .map(
                      () =>
                        iconMarkup(
                          "star",
                          "h-4 w-4 fill-crust-400 text-crust-400"
                        )
                    )
                    .join("")
                }
              </div>

              <blockquote
                class="
                  mt-4
                  leading-relaxed
                  text-wine-800/85
                "
              >
                “${item.text}”
              </blockquote>

              <figcaption
                class="
                  mt-6
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  class="
                    grid
                    h-11
                    w-11
                    place-items-center
                    rounded-full
                    bg-wine-700
                    font-display
                    font-bold
                    text-cream-50
                  "
                >
                  ${item.name.charAt(0)}
                </span>

                <div>
                  <div
                    class="
                      font-semibold
                      text-wine-900
                    "
                  >
                    ${item.name}
                  </div>

                  <div
                    class="
                      text-sm
                      text-wine-800/60
                    "
                  >
                    ${item.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          `
        )
        .join("");
  }

  function cartCount() {
    return Object
      .values(state.cart)
      .reduce(
        (total, qty) =>
          total + qty,
        0
      );
  }

  function cartTotal() {
    return Object
      .entries(state.cart)
      .reduce(
        (
          total,
          [id, qty]
        ) => {
          const item =
            menu.find(
              (pizza) =>
                pizza.id === id
            );

          return (
            total
            + (
              item
                ? item.price * qty
                : 0
            )
          );
        },
        0
      );
  }

  function renderCart() {
    const entries =
      Object
        .entries(state.cart)
        .filter(
          ([, qty]) =>
            qty > 0
        );

    const count =
      cartCount();

    const countBadge =
      el("cart-count");

    countBadge.textContent =
      String(count);

    countBadge.hidden =
      count === 0;

    if (
      entries.length === 0
    ) {
      el(
        "cart-items"
      ).innerHTML = `
        <div class="cart-empty">
          <div>
            <div
              class="
                font-script
                text-2xl
                text-crust-500
              "
            >
              ancora niente
            </div>

            <h3
              class="
                mt-1
                font-display
                text-xl
                font-bold
                text-wine-900
              "
            >
              Tu pedido está vacío
            </h3>

            <p
              class="
                mt-2
                text-sm
              "
            >
              Añade una pizza
              desde el menú
              para comenzar.
            </p>
          </div>
        </div>
      `;
    } else {
      el(
        "cart-items"
      ).innerHTML =
        entries
          .map(
            ([id, qty]) => {
              const item =
                menu.find(
                  (pizza) =>
                    pizza.id
                    === id
                );

              if (!item) {
                return "";
              }

              return `
                <article
                  class="cart-row"
                >
                  <img
                    src="${item.image}"
                    alt="${item.name}"
                  />

                  <div>
                    <h3>
                      ${item.name}
                    </h3>

                    <div
                      class="
                        unit-price
                      "
                    >
                      ${money(item.price)}
                      c/u
                    </div>

                    <div
                      class="
                        qty-controls
                      "
                    >
                      <button
                        type="button"
                        data-qty="${id}"
                        data-delta="-1"
                        aria-label="
                          Restar una pizza
                        "
                      >
                        −
                      </button>

                      <strong>
                        ${qty}
                      </strong>

                      <button
                        type="button"
                        data-qty="${id}"
                        data-delta="1"
                        aria-label="
                          Sumar una pizza
                        "
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div
                    class="
                      cart-row-total
                    "
                  >
                    ${
                      money(
                        item.price
                        * qty
                      )
                    }
                  </div>
                </article>
              `;
            }
          )
          .join("");
    }

    el(
      "cart-total"
    ).textContent =
      money(cartTotal());

    el(
      "checkout-button"
    ).disabled =
      entries.length === 0;

    el(
      "checkout-button"
    ).style.opacity =
      entries.length === 0
        ? ".5"
        : "1";
  }

  function showToast(text) {
    const toast =
      el("toast");

    toast.textContent =
      text;

    toast.classList.add(
      "is-visible"
    );

    clearTimeout(
      showToast.timer
    );

    showToast.timer =
      setTimeout(
        () =>
          toast.classList.remove(
            "is-visible"
          ),
        2200
      );
  }

  function addToCart(id) {
    const item =
      menu.find(
        (pizza) =>
          pizza.id === id
      );

    if (
      !item
      || item.stock <= 0
    ) {
      return;
    }

    const current =
      state.cart[id] || 0;

    if (
      current
      >= item.stock
    ) {
      showToast(
        `No hay más stock disponible de ${item.name}`
      );

      return;
    }

    state.cart[id] =
      current + 1;

    syncUrl({
      replace: false
    });

    renderCart();

    showToast(
      `${item.name} añadida al pedido`
    );
  }

  function changeQuantity(
    id,
    delta
  ) {
    const item =
      menu.find(
        (pizza) =>
          pizza.id === id
      );

    if (!item) {
      return;
    }

    const next =
      (
        state.cart[id] || 0
      ) + delta;

    if (
      next <= 0
    ) {
      delete state.cart[id];
    } else {
      state.cart[id] =
        Math.min(
          next,
          item.stock,
          20
        );
    }

    syncUrl();
    renderCart();
  }

  function openCart() {
    el(
      "cart-overlay"
    ).classList.add(
      "is-open"
    );

    el(
      "cart-drawer"
    ).classList.add(
      "is-open"
    );

    el(
      "cart-overlay"
    ).setAttribute(
      "aria-hidden",
      "false"
    );

    el(
      "cart-drawer"
    ).setAttribute(
      "aria-hidden",
      "false"
    );

    document.body
      .classList.add(
        "cart-open"
      );
  }

  function closeCart() {
    el(
      "cart-overlay"
    ).classList.remove(
      "is-open"
    );

    el(
      "cart-drawer"
    ).classList.remove(
      "is-open"
    );

    el(
      "cart-overlay"
    ).setAttribute(
      "aria-hidden",
      "true"
    );

    el(
      "cart-drawer"
    ).setAttribute(
      "aria-hidden",
      "true"
    );

    document.body
      .classList.remove(
        "cart-open"
      );
  }

  function setupNavbar() {
    const navbar =
      el("navbar");

    function onScroll() {
      if (
        window.scrollY > 24
      ) {
        navbar.classList.add(
          "bg-cream-50/95",
          "shadow-md",
          "shadow-wine-900/5",
          "backdrop-blur"
        );

        navbar.classList.remove(
          "bg-transparent"
        );
      } else {
        navbar.classList.remove(
          "bg-cream-50/95",
          "shadow-md",
          "shadow-wine-900/5",
          "backdrop-blur"
        );

        navbar.classList.add(
          "bg-transparent"
        );
      }
    }

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true
      }
    );

    onScroll();

    const button =
      el(
        "mobile-menu-button"
      );

    const panel =
      el("mobile-menu");

    button.addEventListener(
      "click",
      () => {
        const open =
          panel.classList.toggle(
            "is-open"
          );

        button.setAttribute(
          "aria-expanded",
          String(open)
        );

        button.innerHTML =
          iconMarkup(
            open
              ? "x"
              : "menu",
            "h-6 w-6"
          );
      }
    );

    panel
      .querySelectorAll("a")
      .forEach(
        (link) => {
          link.addEventListener(
            "click",
            () => {
              panel.classList.remove(
                "is-open"
              );

              button.setAttribute(
                "aria-expanded",
                "false"
              );

              button.innerHTML =
                iconMarkup(
                  "menu",
                  "h-6 w-6"
                );
            }
          );
        }
      );
  }

  function setupReveal() {
    const nodes = [
      ...document.querySelectorAll(
        ".reveal"
      )
    ];

    if (
      !(
        "IntersectionObserver"
        in window
      )
    ) {
      nodes.forEach(
        (node) =>
          node.classList.add(
            "is-visible"
          )
      );

      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target
                  .classList.add(
                    "is-visible"
                  );

                observer.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );

    nodes.forEach(
      (node) =>
        observer.observe(node)
    );
  }

  function setupMenuEvents() {
    el(
      "menu-filters"
    ).addEventListener(
      "click",
      (event) => {
        const button =
          event.target.closest(
            "[data-filter]"
          );

        if (!button) {
          return;
        }

        state.filter =
          button.dataset.filter;

        renderFilters();
        renderMenu();
        syncUrl();
      }
    );

    const search =
      el("menu-search");

    const clear =
      el("search-clear");

    search.value =
      state.query;

    clear.hidden =
      !state.query;

    let timer;

    search.addEventListener(
      "input",
      () => {
        clearTimeout(timer);

        state.query =
          search.value;

        clear.hidden =
          !state.query;

        timer =
          setTimeout(
            () => {
              renderMenu();
              syncUrl();
            },
            120
          );
      }
    );

    clear.addEventListener(
      "click",
      () => {
        search.value = "";
        state.query = "";
        clear.hidden = true;

        renderMenu();
        syncUrl();

        search.focus();
      }
    );

    el(
      "menu-grid"
    ).addEventListener(
      "click",
      (event) => {
        const button =
          event.target.closest(
            "[data-add]"
          );

        if (!button) {
          return;
        }

        addToCart(
          button.dataset.add
        );
      }
    );
  }

  function setupCartEvents() {
    el(
      "cart-trigger"
    ).addEventListener(
      "click",
      openCart
    );

    el(
      "mobile-cart-trigger"
    ).addEventListener(
      "click",
      () => {
        el(
          "mobile-menu"
        ).classList.remove(
          "is-open"
        );

        openCart();
      }
    );

    el(
      "contact-order-button"
    ).addEventListener(
      "click",
      openCart
    );

    el(
      "cart-close"
    ).addEventListener(
      "click",
      closeCart
    );

    el(
      "cart-overlay"
    ).addEventListener(
      "click",
      closeCart
    );

    el(
      "cart-items"
    ).addEventListener(
      "click",
      (event) => {
        const button =
          event.target.closest(
            "[data-qty]"
          );

        if (!button) {
          return;
        }

        changeQuantity(
          button.dataset.qty,
          Number(
            button.dataset.delta
          )
        );
      }
    );

    el(
      "checkout-button"
    ).addEventListener(
      "click",
      () => {
        if (
          cartCount() === 0
        ) {
          return;
        }

        showToast(
          "Pedido simulado confirmado. El pago no se procesa en este prototipo."
        );

        state.cart = {};

        syncUrl({
          replace: false
        });

        renderCart();

        setTimeout(
          closeCart,
          500
        );
      }
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key
          === "Escape"
        ) {
          closeCart();
        }
      }
    );
  }

  function setupHistory() {
    window.addEventListener(
      "popstate",
      () => {
        readStateFromUrl();

        el(
          "menu-search"
        ).value =
          state.query;

        el(
          "search-clear"
        ).hidden =
          !state.query;

        renderFilters();
        renderMenu();
        renderCart();
      }
    );
  }

  async function init() {
    console.log("[La Fornace] init ejecutado");

    el(
      "year"
    ).textContent =
      String(
        new Date().getFullYear()
      );

    try {
      await loadMenu();

      console.log(
        "Productos cargados desde la API:",
        menu
      );
    } catch (error) {
      console.error(
        "No se pudieron cargar los productos:",
        error
      );

      menu = [];
      filters = ["Todas"];

      el(
        "menu-empty"
      ).textContent =
        "No se pudieron cargar los productos desde el servidor.";
    }

    readStateFromUrl();

    renderFilters();
    renderMenu();
    renderGallery();
    renderTestimonials();
    renderCart();

    hydrateIcons();
    setupNavbar();
    setupReveal();
    setupMenuEvents();
    setupCartEvents();
    setupHistory();
  }

 if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    init
  );
} else {
  init();
}

})();