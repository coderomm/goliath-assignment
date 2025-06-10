import { productResolvers } from "./product.resolvers";

export const resolvers = {
    Query: {
        ...productResolvers.Query
    },
    Mutation: {
        ...productResolvers.Mutation
    }
}