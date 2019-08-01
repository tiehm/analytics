/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

export const Constants = {
    Create: 'INSERT INTO accounts (email, password, roles) VALUES (?,?,?);',
    GetAllAnalysis: 'SELECT * FROM analysis WHERE owner = ? ORDER BY creation ASC LIMIT 10;',
    GetAnalysis: 'SELECT * FROM analysis WHERE ID = ? AND (owner = ? OR public = TRUE );',
    InsertAnalysis:
        // eslint-disable-next-line max-len
        'INSERT INTO analysis (ID, owner, creation, personOne, personTwo, totalDays, firstMessage, totalMessages, allDaysInTimestamps, allDaysInEmojiPerMessage, allDaysInTotalMessages, allDaysInEmoji, totalMessagesByPersonOnePercentage, totalMessagesByPersonTwoPercentage, totalMessagesByPersonOne, totalMessagesByPersonTwo, msgInfoPerDay, messagesPerDays, messagesPerDaysOne, messagesPerDaysTwo, allMessagesByHour, allMessagesByHourOne, allMessagesByHourTwo, mostActive, mostMessageCount, charT, char1, char2, topEmojis, topWords, public) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
    Login: 'SELECT * FROM accounts WHERE email = ?;',
};
