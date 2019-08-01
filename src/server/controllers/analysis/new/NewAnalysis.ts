/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Request } from 'express';
import { readFileSync, unlinkSync } from 'fs';
import { BadRequestError, UnauthorizedError } from 'routing-controllers';
import { Analysis } from '../../../../structures/Analysis';
import { InsertAnalysis } from '../../../../util/database/Analysis/InsertAnalysis';
import { env } from '../../../../util/Environment';
import { DatabaseError } from '../../../../util/error/DatabaseError';
import { IDGenerator } from '../../../../util/IDGenerator';
import { DecodeToken } from '../../../../util/JWT';
import { AnalysisForm } from './AnalysisForm';

export async function NewAnalysis(req: Request, file: any, body: AnalysisForm) {
    const token = DecodeToken(req.headers.authorization, env.SESSION_TOKEN);
    if (!token) throw new UnauthorizedError();

    let content: string;

    if (file) {
        content = readFileSync(file.path, { encoding: 'utf-8' });
        unlinkSync(file.path);
    } else content = body.chat;

    if (!content) throw new BadRequestError('No chat was provided.');

    const Data: BaseAnalysis = Analysis(content, body.name, body.name2);
    const ID: string = IDGenerator();

    await InsertAnalysis(ID, token.ID, Boolean(body.public), Data).catch(err => {
        throw new DatabaseError('DatabaseError', err);
    });

    return {
        error: false,
        id: ID,
    };
}
