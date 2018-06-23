interface MainStructure {
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
}

interface TimeStructure {
    timeValues: string[];
    firstMessage: string;
    lastMessage: string;
}

interface EmojiStructure {
    topEmojis: {
        [name: string]: number
    };
    emojisSentOne: number;
    emojisSentTwo: number;
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
    }
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

interface Setup {
    personOne: string,
    personTwo: string,
    totalDays: number,
    firstMessage: string,
    totalMessages: number,
    allDaysInTimestamps: number[],
    allDaysInEmojiPerMessage: number[],
    allDaysInTotalMessages: number[],
    allDaysInEmoji: number[],
    totalMessagesByPersonOnePercentage: number,
    totalMessagesByPersonTwoPercentage: number,
    totalMessagesByPersonOne: number,
    totalMessagesByPersonTwo: number,
    msgInfoPerDay: [number, number][],
    messagesPerDays: number[],
    messagesPerDaysOne: number[],
    messagesPerDaysTwo: number[],
    allMessagesByHour: number[],
    allMessagesByHourOne: number[],
    allMessagesByHourTwo: number[],
    mostActive: string,
    mostMessageCount: number,
    charT: [number, number][],
    char1: [number, number][],
    char2: [number, number][],
    topEmojis: {name: string, count: number}[]
}
