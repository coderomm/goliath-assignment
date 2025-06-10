import { mockProducts, mockUsers } from "../../utils/mockData";
import bcrypt from 'bcrypt'
import { createToken } from "../../utils/token";

// Resolvers define how to fetch the types defined in your schema.
export const productResolvers = {
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
            const user = mockUsers.find(u => u.email === email)
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
                sameSite: 'strict',
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