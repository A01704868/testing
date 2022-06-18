import bcrypt from 'bcrypt';

import jwtUtil from '@util/jwt-util';
import { UnauthorizedError } from '@shared/errors';
import { getByEmail } from "@services/user-service";



/**
 * Login()
 * 
 * @param email 
 * @param password 
 * @returns 
 */
async function login(email: string, password: string): Promise<string> {
    // Fetch user
    const user = await getByEmail(email);
    if (!user) {
        throw new UnauthorizedError();
    }
    // Check password
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
        throw new UnauthorizedError();
    }
    // Setup Admin Cookie
    return jwtUtil.sign({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    });
}


// Export default
export default {
    login,
} as const;
