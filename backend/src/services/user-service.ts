import { IUser, UserRoles, fromDbUser } from "@models/user-model";
import { UserNotFoundError } from "@shared/errors";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

/**
 * Add one user.
 *
 * @param userId User id to look for
 * @returns Either a user if it exists or null
 */
export async function getOne(userId: number): Promise<IUser | null> {
  const user = await db.usuario.findFirst({ where: { id: userId } });
  if (user) {
    return fromDbUser(user);
  }

  return null;
}

/**
 * Add one user.
 *
 * @param email User email to look for
 * @returns Either a user if it exists or null
 */
export async function getByEmail(email: string): Promise<IUser | null> {
  const user = await db.usuario.findFirst({ where: { email: email } });
  if (user) {
    return fromDbUser(user);
  }

  return null;
}

/**
 * Get all users.
 *
 * @returns
 */
export async function getAll(): Promise<IUser[]> {
  const users = await db.usuario.findMany();
  return users.map(fromDbUser);
}

/**
 * Add one user.
 *
 * @param user
 * @returns
 */
export async function addOne(user: IUser): Promise<IUser | null> {
  const encryptedPwd = await bcrypt.hash(user.password, 10);
  const result = await db.usuario.create({
    data: {
        email: user.email,
        nombre: user.name,
        password: encryptedPwd,
        role: user.role === UserRoles.Admin ? Role.ADMIN : Role.USER,
    },
  });
  if (result) {
    return { ...user, password: encryptedPwd };
  }

  return null;
}

/**
 * Update one user.
 *
 * @param user
 * @returns
 */
export async function updateOne(user: IUser): Promise<void> {
  const dbUser = await db.usuario.findFirst({ where: { id: user.id } });
  if (dbUser) {
    await db.usuario.update({
      where: { id: user.id },
      data: {
        nombre: user.name,
        email: user.email,
        role: user.role === UserRoles.Admin ? Role.ADMIN : Role.USER,
      },
    });

    return;
  }

  throw new UserNotFoundError();
}

/**
 * Delete a user by their id.
 *
 * @param userId
 * @returns
 */
export async function deleteOne(userId: number): Promise<void> {
  const user = await db.usuario.delete({ where: { id: userId } });

  if (!user) {
    throw new UserNotFoundError();
  }

  return;
}

// Export default
export default {
  getAll,
  getOne,
  getByEmail,
  addOne,
  updateOne,
  deleteOne,
} as const;
