/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { DecodeToken } from '../../util/JWT';

/**
 * Set the user object if the request comes with a valid authorization header
 */
@Middleware({ type: 'before' })
export class AuthHeaderReader implements ExpressMiddlewareInterface {
    public use(req: Request, res: Response, next?: NextFunction): void {
        const token: string = req.headers.authorization as string;
        const user: TokenObject = DecodeToken(token, process.env.SESSION_TOKEN);

        if (user) {
            req.user = user;
            req.user.roles = JSON.parse(user.roles);
        }

        next();
    }
}
