/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as express from 'express';
import { MysqlError } from 'mysql';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
    public error(error: HttpError, req: express.Request, res: express.Response) {
        if (error.name === 'DatabaseError') {
            // eslint-disable-next-line no-console
            console.log((error as any).args as MysqlError);

            return res.json({
                error: true,
                status: 500,
                name: error.name,
                message: error.message,
            });
        } else if (error.name === 'AlreadyExistError')
            return res.json({
                error: true,
                status: error.httpCode,
                name: error.name,
                message: error.message,
            });
        else if (error.name === 'WrongCredentialsError')
            return res.json({
                error: true,
                status: error.httpCode,
                name: error.name,
                message: error.message,
            });
        else if (error.name === 'BadRequestError')
            return res.json({
                error: true,
                status: error.httpCode,
                name: error.name,
                message: 'Invalid request body.',
                errors: (error as any).errors || null,
            });
        else return res.json(error);
    }
}
