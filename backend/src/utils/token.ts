import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET missing');
}
const SECRET = JWT_SECRET as string;

export const createToken = (userId: string) => {
    return jwt.sign({ id: userId }, SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET) as { id: string };
}