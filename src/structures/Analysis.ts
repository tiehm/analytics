/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as moment from 'moment';
import { WordStructure } from './word/WordStructure';

import { EmojiStructure } from './emoji/EmojiStructure';
import { MainStructure } from './main/MainStructure';
import { MessageDateStructure } from './time/MessageDateStructure';
import { MessagesHour } from './time/MessagesHour';
import { MessagesWeekday } from './time/MessagesWeekday';
import { MostActiveDay } from './time/MostActiveDay';
import { TimeStructure } from './time/TimeStructure';
import { GenerateRegExp } from './util/GenerateRegExp';
import { TopWords } from './word/TopWords';

export function Analysis(ChatContent: string, nameOne: string, nameTwo: string): BaseAnalysis {
    const { NameOneRegex, NameTwoRegex } = GenerateRegExp(nameOne, nameTwo);

    const Main = MainStructure(ChatContent, NameOneRegex, NameTwoRegex);
    const Time = TimeStructure(ChatContent);
    const MessageDate = MessageDateStructure(Main, Time, nameOne, nameTwo);
    const TopEmojis = EmojiStructure(Main, nameOne, nameTwo);
    const MostActive = MostActiveDay(MessageDate);
    const { totalMessagesByAllOne, totalMessagesByAllTwo, totalMessagesByAll } = MessagesWeekday(
        Main,
        nameOne,
        nameTwo,
    );
    const Hour = MessagesHour(Main, nameOne, nameTwo);
    const wordStructure = WordStructure(Main, nameOne, nameTwo);
    const topWords = TopWords(wordStructure);

    const totalMessagesSent = {
        all: Main.length,
        one: Main.filter(_ => _.from === nameOne).length,
        two: Main.filter(_ => _.from === nameTwo).length,
    };
    const daysOfChatting: number = moment(Time.lastMessage, 'DD.MM.YY HH:ss').diff(
        moment(Time.firstMessage, 'DD.MM.YY HH:ss'),
        'days',
    );

    const allDaysAsTimestamp: number[] = [];
    const allDaysEmojiCount: number[] = [];
    const allDaysEmojiChance: number[] = [];
    const allDaysTotalMessageCount: number[] = [];
    const messageInfoPerDay: [number, number][] = [];
    const charsPerMsgTotal: [number, number][] = [];
    const charsPerMsgOne: [number, number][] = [];
    const charsPerMsgTwo: [number, number][] = [];
    for (const info in MessageDate) {
        if (MessageDate.hasOwnProperty(info)) {
            allDaysTotalMessageCount.push(MessageDate[info].count);
            messageInfoPerDay.push([MessageDate[info].timestamp, MessageDate[info].count]);
            allDaysAsTimestamp.push(MessageDate[info].timestamp);
            allDaysEmojiChance.push(MessageDate[info].emojiTotal / MessageDate[info].count || 0);
            allDaysEmojiCount.push(MessageDate[info].emojiTotal);
            charsPerMsgTotal.push([MessageDate[info].timestamp, MessageDate[info].charsPerMessage.all]);
            charsPerMsgOne.push([MessageDate[info].timestamp, MessageDate[info].charsPerMessage.one]);
            charsPerMsgTwo.push([MessageDate[info].timestamp, MessageDate[info].charsPerMessage.two]);
        }
    }

    return {
        // All days from first chat to today as Date Timestamps
        allDaysInTimestamps: allDaysAsTimestamp,
        // All days listed with the chance of an emoji in a message
        allDaysInEmojiPerMessage: allDaysEmojiChance,
        // Message count per day for each day
        allDaysInTotalMessages: allDaysTotalMessageCount,
        // Emoji Count per day for each day
        allDaysInEmoji: allDaysEmojiCount,
        // Date of first message
        firstMessage: Time.firstMessage,
        // Name of 1st Chat Person
        personOne: nameOne,
        // Name of 2nd Chat Person
        personTwo: nameTwo,
        // Number of days since first message
        totalDays: daysOfChatting,
        // Number of sent messages
        totalMessages: totalMessagesSent.all,
        // Percentage of messages from 1st Person
        totalMessagesByPersonOnePercentage: 100 * (totalMessagesSent.one / totalMessagesSent.all),
        // Percentage of message from 2nd Person
        totalMessagesByPersonTwoPercentage: 100 * (totalMessagesSent.two / totalMessagesSent.all),
        // total number of messages sent by 1st person
        totalMessagesByPersonOne: totalMessagesSent.one,
        // total number of messages sent by 2nd person
        totalMessagesByPersonTwo: totalMessagesSent.two,
        // All days with timestamps and number of messages
        msgInfoPerDay: messageInfoPerDay,
        // All weekdays and the total messages
        messagesPerDays: totalMessagesByAll,
        // All weekdays and total messages from 1st person
        messagesPerDaysOne: totalMessagesByAllOne,
        // All weekdays and total messages from 2nd person
        messagesPerDaysTwo: totalMessagesByAllTwo,
        // All hours and total messages
        allMessagesByHour: Hour.totalMessagesByAll,
        // All hours and total messages from 1st person
        allMessagesByHourOne: Hour.totalMessagesByOne,
        // All hours and total messages from 1st person
        allMessagesByHourTwo: Hour.totalMessagesByTwo,
        // Date of most active day
        mostActive: MostActive.day,
        // number of messages on most active day
        mostMessageCount: MostActive.count,
        // chars used per message together with timestamp
        charT: charsPerMsgTotal,
        // chars used by 2nd person per message together with timestamp
        char1: charsPerMsgOne,
        // chars used by 2nd person per message together with timestamp
        char2: charsPerMsgTwo,
        // Top 5 emojis with name and count
        topEmojis: TopEmojis.all,

        topWords,
    };
}
