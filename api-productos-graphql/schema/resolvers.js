import { GraphQLError } from "graphql";
import Producto from "../models/Producto.js";

export const resolvers = {
    Query: {
        productos: async (_, { limit = 10, offset = 0 }) => {
            const limiteSeguro = Math.min(limit, 50);
            return Producto.find().skip(Math.max(offset, 0)).limit(limiteSeguro);
        },
        producto: async (_, { id }) => {
            const producto = await Producto.findById(id);
            if (!producto) {
                throw new GraphQLError("Producto no encontrado", {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return producto;
        },
    },
    Mutation: {
        crearProducto: async (_, { input }) => {
            if (input.precio < 0) {
                throw new GraphQLError("El precio no puede ser negativo", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }
            return Producto.create(input);
        },
        actualizarProducto: async (_, { id, input }) => {
            const actualizado = await Producto.findByIdAndUpdate(id, input, {
                new: true,
                runValidators: true,
            });
            if (!actualizado) {
                throw new GraphQLError("Producto no encontrado", {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return actualizado;
        },
        eliminarProducto: async (_, { id }) => {
            const eliminado = await Producto.findByIdAndDelete(id);
            return !!eliminado;
        },
    },
};
