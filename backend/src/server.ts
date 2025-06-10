import dotenv from 'dotenv/config'
// Load environment variables first, before any other imports

import { mockProducts, mockUsers } from './utils/mockData'
import jwt from 'jsonwebtoken';
import cors from 'cors'
import express from 'express';
import http from 'http'
import cookie from 'cookie'
import cookieParser from 'cookie-parser'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs } from "./graphql/typeDefs/index";
import { resolvers } from "./graphql/resolvers/index";
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { createToken, verifyToken } from './utils/token';
import { AppContext } from './utils/types';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET missing')
}

const CORS_WHITELIST = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173'
]

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const app = express();
const PORT = process.env.PORT || 5001

app.use(express.json());
app.use(cookieParser());

app.get('/', (_req, res) => {
    res.send('Nothing to see here...')
})

async function startServer() {
    const httpServer = http.createServer(app);
    const apolloServer = new ApolloServer<AppContext>({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    await apolloServer.start();

    // https://community.apollographql.com/t/error-in-using-expressmiddleware/8415/3
    app.use('/graphql',
        cors<cors.CorsRequest>({ origin: CORS_WHITELIST, credentials: true }),
        expressMiddleware(apolloServer, {
            context: async ({ req, res }): Promise<AppContext> => {
                const token = req.headers.cookie ? cookie.parse(req.headers.cookie).token : undefined;
                const user = token ? verifyToken(token) : null;
                return { user, token, req, res };
            },
        }));

    await new Promise<void>((resolve) => httpServer.listen({ PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
}

startServer().catch(error => {
    console.error('Error starting server:', error);
});