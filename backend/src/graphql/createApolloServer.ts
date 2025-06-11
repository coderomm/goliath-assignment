import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { Server } from 'http'
import { typeDefs } from "./typeDefs/index";
import { resolvers } from "./resolvers/index";

export const createApolloServer = (_httpServer: Server): ApolloServer => {
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer: _httpServer })],
    })

    return server
}
