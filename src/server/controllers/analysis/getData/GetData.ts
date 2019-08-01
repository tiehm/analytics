/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Request } from 'express';
import { NotFoundError } from 'routing-controllers';
import { GetAnalysisFromDatabase } from '../../../../util/database/Analysis/GetAnalysisFromDatabase';
import { env } from '../../../../util/Environment';
import { DatabaseError } from '../../../../util/error/DatabaseError';
import { DecodeToken } from '../../../../util/JWT';

export async function GetData(req: Request, id: string): Promise<Analysis> {
    const token = DecodeToken(req.headers.authorization, env.SESSION_TOKEN);
    const data: DatabaseReturnAnalysis = await GetAnalysisFromDatabase(id, token ? token.ID : null).catch(err => {
        if (err) throw new DatabaseError('DatabaseError', err);
        else throw new NotFoundError();
    });

    return {
        ID: data.ID,
        owner: data.owner,
        creation: data.creation,
        personOne: data.personOne,
        personTwo: data.personTwo,
        totalDays: data.totalDays,
        firstMessage: data.firstMessage,
        totalMessages: data.totalMessages,
        allDaysInTimestamps: JSON.parse(data.allDaysInTimestamps),
        allDaysInEmojiPerMessage: JSON.parse(data.allDaysInEmojiPerMessage),
        allDaysInTotalMessages: JSON.parse(data.allDaysInTotalMessages),
        allDaysInEmoji: JSON.parse(data.allDaysInEmoji),
        totalMessagesByPersonOnePercentage: data.totalMessagesByPersonOnePercentage,
        totalMessagesByPersonTwoPercentage: data.totalMessagesByPersonTwoPercentage,
        totalMessagesByPersonOne: data.totalMessagesByPersonOne,
        totalMessagesByPersonTwo: data.totalMessagesByPersonTwo,
        msgInfoPerDay: JSON.parse(data.msgInfoPerDay),
        messagesPerDays: JSON.parse(data.messagesPerDays),
        messagesPerDaysOne: JSON.parse(data.messagesPerDaysOne),
        messagesPerDaysTwo: JSON.parse(data.messagesPerDaysTwo),
        allMessagesByHour: JSON.parse(data.allMessagesByHour),
        allMessagesByHourOne: JSON.parse(data.allMessagesByHourOne),
        allMessagesByHourTwo: JSON.parse(data.allMessagesByHourTwo),
        mostActive: data.mostActive,
        mostMessageCount: data.mostMessageCount,
        charT: JSON.parse(data.charT),
        char1: JSON.parse(data.char1),
        char2: JSON.parse(data.char2),
        topEmojis: JSON.parse(data.topEmojis),
        topWords: JSON.parse(data.topWords),
        public: data.public,
    };
}
