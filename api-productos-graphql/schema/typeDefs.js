export const typeDefs = `#graphql
  type Producto {
    id: ID!
    nombre: String!
    precio: Float!
    stock: Int!
    descripcion: String
    categoria: String
    fechaCreacion: String
  }

  input ProductoInput {
    nombre: String!
    precio: Float!
    stock: Int
    descripcion: String
    categoria: String
  }

  input ActualizarProductoInput {
    nombre: String
    precio: Float
    stock: Int
    descripcion: String
    categoria: String
  }

  type Query {
    productos(limit: Int, offset: Int): [Producto!]!
    producto(id: ID!): Producto
  }

  type Mutation {
    crearProducto(input: ProductoInput!): Producto!
    actualizarProducto(id: ID!, input: ActualizarProductoInput!): Producto
    eliminarProducto(id: ID!): Boolean!
  }
`;
