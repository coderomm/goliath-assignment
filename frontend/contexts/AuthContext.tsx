import { createContext, type ReactNode, useEffect, useState } from "react";
import type { AuthContextType, User } from "../utils/types";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_MUTATION, LOGOUT_MUTATION } from "../graphql/mutations";
import { ME_QUERY } from "../graphql/queries";
import { client } from "../graphql/client";

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const [loginMutation] = useMutation(LOGIN_MUTATION)
    const [logoutMutation] = useMutation(LOGOUT_MUTATION)
    const { data: meData } = useQuery(ME_QUERY, {
        errorPolicy: 'ignore'
    })

    useEffect(() => {
        if (meData?.me) {
            setUser(meData.me)
        }
        setLoading(false)
    }, [meData])

    const login = async (email: string, password: string) => {
        try {
            const { data } = await loginMutation({
                variables: {
                    email,
                    password
                }
            })
            // console.log('data= ', data)
            setUser(data.Login.user)
            client.refetchQueries({ include: [ME_QUERY] });
        } catch (error: any) {
            throw new Error(error)
        }
    }

    const logout = async () => {
        try {
            await logoutMutation()
            setUser(null)
            client.clearStore()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }