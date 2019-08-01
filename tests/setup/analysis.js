/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

/*eslint @typescript-eslint/no-var-requires:0*/
const { Constants } = require('../../src/util/database/Constants');
const data = require('../structures/chat/data.json');

module.exports = function(connection, id, owner) {
    return new Promise((resolve, reject) => {
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
                false,
            ],
            err => {
                if (err) return reject(err);
                else
                    return resolve({
                        ID: id,
                        data: {
                            ID: id,
                            owner: owner,
                            creation: now,
                            personOne: data.personOne,
                            personTwo: data.personTwo,
                            totalDays: data.totalDays,
                            firstMessage: data.firstMessage,
                            totalMessages: data.totalMessages,
                            allDaysInTimestamps: data.allDaysInTimestamps,
                            allDaysInEmojiPerMessage: data.allDaysInEmojiPerMessage,
                            allDaysInTotalMessages: data.allDaysInTotalMessages,
                            allDaysInEmoji: data.allDaysInEmoji,
                            totalMessagesByPersonOnePercentage: data.totalMessagesByPersonOnePercentage,
                            totalMessagesByPersonTwoPercentage: data.totalMessagesByPersonTwoPercentage,
                            totalMessagesByPersonOne: data.totalMessagesByPersonOne,
                            totalMessagesByPersonTwo: data.totalMessagesByPersonTwo,
                            msgInfoPerDay: data.msgInfoPerDay,
                            messagesPerDays: data.messagesPerDays,
                            messagesPerDaysOne: data.messagesPerDaysOne,
                            messagesPerDaysTwo: data.messagesPerDaysTwo,
                            allMessagesByHour: data.allMessagesByHour,
                            allMessagesByHourOne: data.allMessagesByHourOne,
                            allMessagesByHourTwo: data.allMessagesByHourTwo,
                            mostActive: data.mostActive,
                            mostMessageCount: data.mostMessageCount,
                            charT: data.charT,
                            char1: data.char1,
                            char2: data.char2,
                            topEmojis: data.topEmojis,
                            topWords: data.topWords,
                            public: 0,
                        },
                    });
            },
        );
    });
};
