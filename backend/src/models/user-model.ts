import { Usuario, Role } from "@prisma/client";

export enum UserRoles {
    User,
    Admin,
}

export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: UserRoles;
}


/**
 * Get a new User object.
 * 
 * @param name 
 * @param email 
 * @param role 
 * @param password 
 * @returns 
 */
function getNew(
    name: string,
    email: string,
    role?: UserRoles,
    password?: string,
): IUser {
    return {
        id: -1,
        email,
        name,
        role: role ?? UserRoles.User,
        password: password ?? '',
    };
}

export function fromDbUser(user: Usuario): IUser {
    return {
        id: user.id,
        email: user.email,
        name: user.nombre,
        password: user.password,
        role: user.role === Role.ADMIN
            ? UserRoles.Admin
            : UserRoles.User
    };
}


/**
 * Copy a user object.
 * 
 * @param user 
 * @returns 
 */
function copy(user: IUser): IUser {
    return { ...user };
}


// Export default
export default {
    fromDbUser,
    new: getNew,
    copy,
}
