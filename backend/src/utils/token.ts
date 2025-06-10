import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET missing')
}

export const createToken = (userId: string) => {
    try {
        if (!userId) {
            return null
        }
        return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' })
    } catch (error) {
        console.error(error)
        return null
    }
}

export const verifyToken = (token: string) => {
    try {
        if (!token) {
            return null;
        }
        return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch (error) {
        console.error(error)
        return null
    }
}