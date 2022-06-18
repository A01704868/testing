import authService from '@services/auth-service';
import userService from "@services/user-service";
import { ParamMissingError } from '@shared/errors';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import { IUser, UserRoles } from "@models/user-model";


// Constants
const router = Router();
const { OK, CREATED } = StatusCodes;

// Paths
export const p = {
    login: '/login',
    logout: '/logout',
    signon: '/signon'
} as const;

// Cookie Properties
export const cookieProps = Object.freeze({
    key: 'ExpressGeneratorTs',
    secret: process.env.COOKIE_SECRET,
    options: {
        httpOnly: true,
        signed: true,
        path: (process.env.COOKIE_PATH),
        maxAge: Number(process.env.COOKIE_EXP),
        domain: (process.env.COOKIE_DOMAIN),
        // secure: (process.env.SECURE_COOKIE === 'true'),
    },
});

const isNil = (value: any) => value === null || value === undefined;

/**
 * Login a user.
 */
router.post(p.login, async (req: Request, res: Response) => {
    // Check email and password present
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ParamMissingError();
    }
    // Get jwt
    const jwt = await authService.login(email, password);

    // Add jwt to cookie
    const { key, options } = cookieProps;
    res.cookie(key, jwt, options);
    res.cookie('email', email, {
        maxAge: Number(process.env.COOKIE_EXP),
        domain: (process.env.COOKIE_DOMAIN)
    });

    // Return
    return res.status(OK).end();
});

/**
 * Create a new user account
 */
router.post(p.signon, async (req: Request, res: Response) => {
    // Check user data present
    const { name, email, password, role } = req.body;
    if (isNil(name) || isNil(email) || isNil(password)) {
        throw new ParamMissingError();
    }
    const user: IUser = {
        name: name,
        email: email,
        password: password,
        role: role === 1 ? UserRoles.Admin : UserRoles.User
    };

    await userService.addOne(user);

    // // Get jwt
    // const jwt = await authService.login(user.email, user.password);
    // // Add jwt to cookie
    // const { key, options } = cookieProps;
    // res.cookie(key, jwt, options);
    // res.cookie('email', email, {
    //     maxAge: Number(process.env.COOKIE_EXP),
    //     domain: (process.env.COOKIE_DOMAIN),
    //     secure: true
    // });

    // Return
    return res.status(CREATED).end();
});


/**
 * Logout the user.
 */
router.get(p.logout, (_: Request, res: Response) => {
    const { key, options } = cookieProps;
    res.clearCookie(key, options);
    res.clearCookie('email', options);
    return res.status(OK).end();
});


// Export router
export default router;
