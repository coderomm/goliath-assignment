import { mockProducts, mockUsers } from './mockData'
import jwt from 'jsonwebtoken';
import express from 'express';
import http from 'http'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET missing')
}

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// Adding #graphql to the beginning of a template literal provides GraphQL syntax highlighting in supporting IDEs.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    type User {
        id: ID!
        email: String!
    }

    type Product {
        id: ID!
        name: String!
        category: String!
        price: Float!
        stock: Int!
        createdAt: String!
    }
        
    type AuthPayload {
        user: User!
        token: String!
    }
        
    input ProductFilter {
        category: String
        priceMin: Float
        priceMax: Float
        stockMin: Int
    }

    enum SortOrder {
        ASC
        DESC
    }

    input ProductSort {
        field: String!
        order: SortOrder!
    }

    type Query {
        me: User
        products(filter: ProductFilter, sort: ProductSort, limit: Int, offset: Int): [Product!]!
    }

    type Mutation {
        Login(email: String!, password: String!):AuthPayload!
        Logout: Boolean!
    }
`;

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
        me: async (_: any, __: any, context: any) => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            return mockUsers.find(user => user.id === context.user.id)
        },
        products: async (_: any, args: { filter?: any, sort?: any, limit?: number, offset?: number }) => {
            let filteredProducts = [...mockProducts]
            if (args.filter) {
                const { category, priceMin, priceMax, stockMin } = args.filter
                if (category) {
                    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase().includes(category.toLowerCase()))
                }
                if (priceMin) {
                    filteredProducts = filteredProducts.filter(p => p.price >= priceMin)
                }
                if (priceMax) {
                    filteredProducts = filteredProducts.filter(p => p.price <= priceMax)
                }
                if (stockMin) {
                    filteredProducts = filteredProducts.filter(p => p.stock >= stockMin);
                }
            }
            if (args.sort) {
                const { field, order } = args.sort
                filteredProducts.sort((a: any, b: any) => {
                    let aVal = a[field]
                    let bVal = b[field]

                    if (typeof aVal === 'string') {
                        aVal = aVal.toLowerCase();
                        bVal = bVal.toLowerCase();
                    }

                    if (aVal < bVal) {
                        return order === 'ASC' ? -1 : 1
                    }

                    if (aVal > bVal) {
                        return order === 'ASC' ? 1 : -1
                    }
                    return 0
                })
            }
            const offset = args.offset || 0
            const limit = args.limit || filteredProducts.length

            return filteredProducts.slice(offset, offset + limit)
        },
    },

    Mutation: {
        Login: async (_: any, { email, password }: { email: string; password: string }, context: any) => {
            // console.log('email: ', email)
            // console.log('password: ', password)
            const user = mockUsers.find(u => u.email === email)
            // console.log('user== ',user)
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const isValid = await bcrypt.compare(password.trim(), user.password)
            if (!isValid) {
                throw new Error('Invalid credentials');
            }

            const token = createToken(user.id)

            context.res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })

            return {
                user: { id: user.id, email: user.email },
                token,
            };
        },
        Logout: async (_: any, __: any, context: any) => {
            context.res.clearCookie('token');
            return true;
        },
    }
}

export const createToken = (userId: string) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' })
}

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch (error) {
        console.error(error)
        return null
    }
}

async function startServer() {
    const app = express();
    const httpServer = http.createServer(app);
    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    await server.start();

    app.use(
        cors({
            origin: 'http://localhost:5173',
            credentials: true,
        })
    );

    app.use(cookieParser());
    app.use(express.json());

    // https://community.apollographql.com/t/error-in-using-expressmiddleware/8415/3
    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req, res }: { req: Request, res: Response }) => {
            const token = req.cookies.token;
            let user: { userId: string } | null = null;

            if (token) {
                user = verifyToken(token);
            }

            return { user, req, res };
        },
    }));

    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000`);
}

startServer().catch(error => {
    console.error('Error starting server:', error);
});