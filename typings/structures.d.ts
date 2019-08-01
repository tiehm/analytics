/*
 * Copyright (c) 2019 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

interface DefaultStructure {
    chars: number;
    words: number;
    from: string;
    time: number;
    day: number;
    hour: number;
    date: string;
    content: string;
    emojiNames: object;
    emoji: number;
    topWords: { [name: string]: number };
}

interface TimeStructure {
    timeValues: string[];
    firstMessage: string;
    lastMessage: string;
}

interface EmojiStructure {
    all: { [name: string]: number };
    one: { [name: string]: number };
    two: { [name: string]: number };
}

interface TopEmojis {
    all: { name: string; count: number }[];
    one: { name: string; count: number }[];
    two: { name: string; count: number }[];
}

interface MessageDateStructure {
    [date: string]: {
        emoji: {
            name: string;
            count: number;
        };
        emojiTotal: number;
        timestamp: number;
        count: number;
        userOne: number;
        userTwo: number;
        wordsPerMessage: string;
        charsPerMessage: {
            all: number;
            one: number;
            two: number;
        };
        topWord: {
            word: string;
            count: number;
        };
    };
}

interface MostActiveDay {
    day: string;
    count: number;
}

interface MessagesHour {
    totalMessagesByAll: number[];
    totalMessagesByOne: number[];
    totalMessagesByTwo: number[];
}

interface WordStructure {
    all: { [name: string]: number };
    one: { [name: string]: number };
    two: { [name: string]: number };
}

interface TopWords {
    all: { [name: string]: number };
    one: { [name: string]: number };
    two: { [name: string]: number };
}

interface MessagesWeekdays {
    totalMessagesByAll: number[];
    totalMessagesByAllOne: number[];
    totalMessagesByAllTwo: number[];
}
