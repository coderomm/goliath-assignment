import bcrypt from 'bcrypt';
import { mockUsers } from './mockData';
import { saltRounds } from './constants';

const users = mockUsers;
const generateHashes = async () => {
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds)
    }
}

generateHashes().catch(console.error);