/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as express from 'express';
import { env } from '../../../../util/Environment';
import { DecodeToken } from '../../../../util/JWT';

export async function VerifyController(req: express.Request) {
    const token = DecodeToken(req.headers.authorization, env.SESSION_TOKEN);
    req.user = token;
    if (token && token.ID)
        return {
            success: true,
            roles: JSON.parse(req.user.roles) || req.user.roles,
            id: req.user.ID,
        };
    else return { success: false };
}
