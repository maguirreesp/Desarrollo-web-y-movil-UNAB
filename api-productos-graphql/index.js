import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";

import { resolvers } from "./schema/resolvers.js";
import { typeDefs } from "./schema/typeDefs.js";
import authRoutes from "./routes/auth.routes.js";
import productosGatewayRoutes from "./routes/productos.gateway.routes.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// --- Gateway: CORS y parseo centralizados para TODA la app ---
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// --- Rutas REST ---
app.use("/api/auth", authRoutes);
app.use("/api/productos", productosGatewayRoutes);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use("/graphql", expressMiddleware(server));

await mongoose.connect(process.env.MONGO_URI);
console.log("Conectado a MongoDB");

const PUERTO = process.env.PORT || 4000;
httpServer.listen(PUERTO, () => {
  console.log(`Servidor listo en http://localhost:${PUERTO}`);
});
