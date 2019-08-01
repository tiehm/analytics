/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Request } from 'express';
import { BadRequestError } from 'routing-controllers';
import { env } from '../../../../util/Environment';
import { DatabaseError } from '../../../../util/error/DatabaseError';
import { WrongCredentialsError } from '../../../../util/error/WrongCredentialsError';
import { DecodeToken, GenerateToken } from '../../../../util/JWT';
import { GetAccount } from './Account';
import { LoginForm } from './LoginForm';

/**
 * Check users login details and return a JWT if valid
 * @param req {Request}
 * @param form {LoginForm} Request Body
 * @constructor
 */
export async function LoginController(req: Request, form: LoginForm) {
    if (process.env.NODE_ENV === 'test') {
        req.user = DecodeToken(req.headers.authorization, env.SESSION_TOKEN);
        if (!form || !form.email || !form.password) throw new BadRequestError();
    }

    if (req.user)
        return {
            error: false,
            token: req.headers.authorization,
            fresh: false,
        };

    const Account: APIAccount = (await GetAccount(form.email, form.password).catch(err => {
        if (err) throw new DatabaseError('DatabaseError', err);
        else throw new WrongCredentialsError();
    })) as APIAccount;

    const token: string = GenerateToken(
        {
            ID: Account.ID,
            roles: JSON.stringify(Account.roles),
        },
        env.SESSION_TOKEN,
    );

    return {
        error: false,
        token,
        fresh: true,
    };
}
