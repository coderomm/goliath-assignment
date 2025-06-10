import { gql } from 'graphql-tag'

// Adding #graphql to the beginning of a template literal provides GraphQL syntax highlighting in supporting IDEs.
// # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

export const productTypeDefs = gql`
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