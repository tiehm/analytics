/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Request } from 'express';
import { BadRequestError } from 'routing-controllers';
// eslint-disable-next-line max-len
import { GetAccountFromDatabaseByEmail } from '../../../../util/database/Account/GetAccountFromDatabaseByEmail';
import { InsertNewAccount } from '../../../../util/database/Account/InsertNewAccount';
import { env } from '../../../../util/Environment';
import { AlreadyExistError } from '../../../../util/error/AlreadyExistError';
import { DatabaseError } from '../../../../util/error/DatabaseError';
import { DecodeToken, GenerateToken } from '../../../../util/JWT';
import { Hash } from '../../../../util/password/Hash';
import { SignUpForm } from './SignUpForm';

/**
 * Create a User and save it to the Database
 * @param req {Request} Request Object
 * @param form {SignUpForm} Request body with password and email
 * @constructor
 */
export async function SignUpController(req: Request, form: SignUpForm) {
    if (process.env.NODE_ENV === 'test') {
        req.user = DecodeToken(req.headers.authorization, env.SESSION_TOKEN);
        if (!form || !form.email || !form.password) throw new BadRequestError();
    }

    // If the user is already logged in, just return the token
    if (req.user)
        return {
            error: false,
            token: req.headers.authorization,
            fresh: false,
        };

    // Throw Error if an account with the submitted email address already exists
    const Account: APIAccount = await GetAccountFromDatabaseByEmail(form.email);
    if (Account) throw new AlreadyExistError();

    const password: string = await Hash(form.password);

    const Insert: APIAccount = (await InsertNewAccount(form.email, password, ['USER']).catch(err => {
        throw new DatabaseError('DatabaseError', err);
    })) as APIAccount;

    const token: string = GenerateToken(
        {
            ID: Insert.ID,
            roles: JSON.stringify(Insert.roles),
        },
        env.SESSION_TOKEN as string,
    );

    return {
        error: false,
        token,
        fresh: true,
    };
}
