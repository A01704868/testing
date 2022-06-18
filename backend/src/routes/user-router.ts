import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import userService from '@services/user-service';
import { ParamMissingError } from '@shared/errors';
import { adminMw, loggedIn } from './middleware';



// Constants
const router = Router();
const { CREATED, OK, BAD_REQUEST, NOT_FOUND } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;



/**
 * Get all users.
 */
router.get(p.get, adminMw, async (_: Request, res: Response) => {
    const users = await userService.getAll();
    return res.status(OK).json({ users });
});


router.get("/email/:email", loggedIn, async (req: Request, res: Response) => {
    const { email } = req.params;

    if (!email) {
        return res.status(BAD_REQUEST).json({ error: "No user email provided" });
    }

    const user = await userService.getByEmail(email);
    if (user) {
        return res.status(OK).json({
            name: user.name,
            email: user.email,
            role: user.role
        });
    } else {
        return res.status(NOT_FOUND)
            .json({ error: "User doesn't exist", email });
    }
});


/**
 * Add one user.
 */
router.post(p.add, adminMw, async (req: Request, res: Response) => {
    const { user } = req.body;
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.addOne(user);
    return res.status(CREATED).json({ user });
});


/**
 * Update one user.
 */
router.put(p.update, adminMw, async (req: Request, res: Response) => {
    const { user } = req.body;
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.updateOne(user);
    return res.status(OK).end();
});


/**
 * Delete one user.
 */
router.delete(p.delete, adminMw, async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.deleteOne(Number(id));
    return res.status(OK).end();
});


// Export default
export default router;
