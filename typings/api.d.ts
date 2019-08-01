/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

// tslint:disable-next-line
declare namespace Express {
    // tslint:disable-next-line
    export interface Request {
        user?: TokenObject;
    }
}

interface TokenObject {
    ID: number;
    roles: string;
}

interface APIAccount {
    ID: number;
    email: string;
    password: string;
    roles: string[];
}

interface Analysis extends BaseAnalysis {
    ID: string;
    owner: number;
    creation: Date;
    public: boolean;
}

interface DatabaseReturnAnalysis {
    ID: string;
    owner: number;
    creation: Date;
    public: boolean;
    personOne: string;
    personTwo: string;
    totalDays: number;
    firstMessage: string;
    totalMessages: number;
    totalMessagesByPersonOnePercentage: number;
    totalMessagesByPersonTwoPercentage: number;
    totalMessagesByPersonOne: number;
    totalMessagesByPersonTwo: number;
    mostActive: string;
    mostMessageCount: number;
    allDaysInTimestamps: string;
    allDaysInEmojiPerMessage: string;
    allDaysInTotalMessages: string;
    allDaysInEmoji: string;
    msgInfoPerDay: string;
    messagesPerDays: string;
    messagesPerDaysOne: string;
    messagesPerDaysTwo: string;
    allMessagesByHour: string;
    allMessagesByHourOne: string;
    allMessagesByHourTwo: string;
    charT: string;
    char1: string;
    char2: string;
    topEmojis: string;
    topWords: string;
}

interface BaseAnalysis {
    personOne: string;
    personTwo: string;
    totalDays: number;
    firstMessage: string;
    totalMessages: number;
    allDaysInTimestamps: number[];
    allDaysInEmojiPerMessage: number[];
    allDaysInTotalMessages: number[];
    allDaysInEmoji: number[];
    totalMessagesByPersonOnePercentage: number;
    totalMessagesByPersonTwoPercentage: number;
    totalMessagesByPersonOne: number;
    totalMessagesByPersonTwo: number;
    msgInfoPerDay: [number, number][];
    messagesPerDays: number[];
    messagesPerDaysOne: number[];
    messagesPerDaysTwo: number[];
    allMessagesByHour: number[];
    allMessagesByHourOne: number[];
    allMessagesByHourTwo: number[];
    mostActive: string;
    mostMessageCount: number;
    charT: [number, number][];
    char1: [number, number][];
    char2: [number, number][];
    topEmojis: { name: string; count: number }[];
    topWords: TopWords;
}
