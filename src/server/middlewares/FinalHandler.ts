/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Request, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware, NotFoundError } from 'routing-controllers';

@Middleware({ type: 'after' })
export class FinalMiddleware implements ExpressMiddlewareInterface {
    public use(req: Request, res: Response): void {
        if (!res.headersSent) res.status(404).json(new NotFoundError('No such route was found.'));
        else res.end();
    }
}
