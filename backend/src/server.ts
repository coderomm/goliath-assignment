import dotenv from 'dotenv'
// Load environment variables first, before any other imports
dotenv.config()
import cors from 'cors'
import express from 'express';
import http from 'http'
import helmet from 'helmet';
import cookieParser from 'cookie-parser'
import morgan from 'morgan';
import { expressMiddleware } from '@apollo/server/express4'
import { AppContext } from './graphql/context';
import { verifyToken } from './utils/token';
import { createApolloServer } from './graphql/createApolloServer';

const CORS_WHITELIST = process.env.CORS_ORIGIN?.split(',') ?? [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173'
];

const app = express();
const PORT = process.env.PORT || 5001

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
    res.send('Nothing to see here...')
})

async function startServer() {
    const httpServer = http.createServer(app);
    const apolloServer = createApolloServer(httpServer)

    await apolloServer.start();

    app.use('/graphql',
        cors<cors.CorsRequest>({ origin: CORS_WHITELIST, credentials: true }),
        expressMiddleware(apolloServer, {
            context: async ({ req, res }): Promise<AppContext> => {
                const token = req.cookies?.token;
                const user = token ? verifyToken(token) : null;
                return { user, token, req, res };
            },
        }));

    await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
}

startServer().catch(error => {
    console.error('Error starting server:', error);
});