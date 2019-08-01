/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Request } from 'express';
import { UnauthorizedError } from 'routing-controllers';
import { GetAllAnalysisFromDatabase } from '../../../../util/database/Analysis/GetAllAnalysisFromDatabase';
import { env } from '../../../../util/Environment';
import { DatabaseError } from '../../../../util/error/DatabaseError';
import { DecodeToken } from '../../../../util/JWT';

export async function GetHomepage(req: Request) {
    const token = DecodeToken(req.headers.authorization, env.SESSION_TOKEN);
    if (!token) throw new UnauthorizedError();
    req.user = token;
    const UserID: number = req.user.ID;

    return (await GetAllAnalysisFromDatabase(UserID).catch(err => {
        if (err) throw new DatabaseError('DatabaseError', err);
        else return {};
    })) as Analysis[];
}
