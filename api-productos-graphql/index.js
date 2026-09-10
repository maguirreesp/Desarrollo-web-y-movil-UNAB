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

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use("/graphql", cors(), express.json(), expressMiddleware(server));

await mongoose.connect(process.env.MONGO_URI);
console.log("Conectado a MongoDB");

const PUERTO = process.env.PORT || 4000;
httpServer.listen(PUERTO, () => {
    console.log(`Servidor listo en http://localhost:${PUERTO}/graphql`);
});
