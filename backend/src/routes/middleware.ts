import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { UserRoles } from '@models/user-model';
import { cookieProps } from '@routes/auth-router';
import jwtUtil from '@util/jwt-util';


// Constants
const { UNAUTHORIZED } = StatusCodes;
const jwtNotPresentErr = 'JWT not present in signed cookie.';
const userIsNotAdminErr = 'User does not have admin rights';

/**
 * Middleware to verify if user is logged in
 * 
 * @param req The request object
 * @param res The response object
 * @param next The next handler in the response pipeline
 * @returns 
 */
export async function loggedIn(req: Request, res: Response, next: NextFunction) {
    try {
        // Get json-web-token
        if (!req.signedCookies[cookieProps.key]) {
            throw Error("User is not signed in");
        }

        // Continue to next handler
        next();
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
};


/**
 * Middleware to verify if user is an admin.
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export async function adminMw(req: Request, res: Response, next: NextFunction) {
    try {
        // Get json-web-token
        const jwt = req.signedCookies[cookieProps.key];
        if (!jwt) {
            throw Error(jwtNotPresentErr);
        }
        // Make sure user role is an admin
        const clientData = await jwtUtil.decode(jwt);
        if (typeof clientData === 'object' && clientData.role === UserRoles.Admin) {
            res.locals.sessionUser = clientData;
            next();
        } else {
            console.log("not an admin")
            throw Error(userIsNotAdminErr);
        }
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
};
