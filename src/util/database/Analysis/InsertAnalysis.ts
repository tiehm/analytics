/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { extend } from '../../ExtendObject';
import { Constants } from '../Constants';
import { pool } from '../pool';

/**
 * Insert Analysis into Database
 * @param id {String} Analysis ID
 * @param owner {Number} Owner ID
 * @param publicAnalysis {Boolean} Weather the Analysis is public for everyone or not
 * @param data {BaseAnalysis} Analysis Data
 * @constructor
 * @return {Promise<Analysis>} Full Analysis
 */
export function InsertAnalysis(
    id: string,
    owner: number,
    publicAnalysis: boolean,
    data: BaseAnalysis,
): Promise<Analysis> {
    return new Promise<Analysis>((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            const now = Date.now();
            connection.query(
                Constants.InsertAnalysis,
                [
                    id,
                    owner,
                    now,
                    data.personOne,
                    data.personTwo,
                    data.totalDays,
                    data.firstMessage,
                    data.totalMessages,
                    JSON.stringify(data.allDaysInTimestamps),
                    JSON.stringify(data.allDaysInEmojiPerMessage),
                    JSON.stringify(data.allDaysInTotalMessages),
                    JSON.stringify(data.allDaysInEmoji),
                    data.totalMessagesByPersonOnePercentage,
                    data.totalMessagesByPersonTwoPercentage,
                    data.totalMessagesByPersonOne,
                    data.totalMessagesByPersonTwo,
                    JSON.stringify(data.msgInfoPerDay),
                    JSON.stringify(data.messagesPerDays),
                    JSON.stringify(data.messagesPerDaysOne),
                    JSON.stringify(data.messagesPerDaysTwo),
                    JSON.stringify(data.allMessagesByHour),
                    JSON.stringify(data.allMessagesByHourOne),
                    JSON.stringify(data.allMessagesByHourTwo),
                    data.mostActive,
                    data.mostMessageCount,
                    JSON.stringify(data.charT),
                    JSON.stringify(data.char1),
                    JSON.stringify(data.char2),
                    JSON.stringify(data.topEmojis),
                    JSON.stringify(data.topWords),
                    publicAnalysis,
                ],
                (err1, results) => {
                    connection.release();
                    if (err1) return reject(err1);
                    const Analysis: any = {};
                    Analysis.ID = results.insertId;
                    Analysis.creation = now;
                    Analysis.owner = owner;
                    Analysis.public = publicAnalysis;
                    resolve(extend(Analysis, data) as Analysis);
                },
            );
        });
    });
}
