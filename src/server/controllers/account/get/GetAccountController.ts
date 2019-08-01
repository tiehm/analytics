/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as express from 'express';
import { BadRequestError, NotFoundError, UnauthorizedError } from 'routing-controllers';
import { GetAccountFromDatabaseByID } from '../../../../util/database/Account/GetAccountFromDatabaseByID';
import { env } from '../../../../util/Environment';
import { DecodeToken } from '../../../../util/JWT';

export async function GetAccountController(req: express.Request, id: number) {
    if (process.env.NODE_ENV === 'test') {
        req.user = DecodeToken(req.headers.authorization, env.SESSION_TOKEN);
        if (!id) throw new BadRequestError();
        if (JSON.parse(req.user.roles).indexOf('ADMIN') === -1) throw new UnauthorizedError();
    }

    const user: APIAccount = await GetAccountFromDatabaseByID(id);

    if (!user) throw new NotFoundError();

    return {
        error: false,
        id: user.ID,
        email: user.email,
        roles: user.roles,
    };
}
