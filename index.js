import express from 'express';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';
import authRoutes from './routes/auth.routes.js';
import productosRoutes from './routes/productos.routes.js';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// --- Gateway: CORS y parseo centralizados para TODA la app ---
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'], // ajusta al origen real de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());

// --- Rutas REST ---
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);

// --- GraphQL (ya no repitas cors()/express.json() acá, quedaron arriba) ---
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
await server.start();
app.use('/graphql', expressMiddleware(server));

await mongoose.connect(process.env.MONGO_URI);
console.log('Conectado a MongoDB');

const PUERTO = process.env.PORT || 4000;
httpServer.listen(PUERTO, () => {
  console.log(`Servidor listo en http://localhost:${PUERTO}`);
});
