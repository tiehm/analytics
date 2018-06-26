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
    topWords: {[name: string]: number};
}

interface TimeStructure {
    timeValues: string[];
    firstMessage: string;
    lastMessage: string;
}

interface EmojiStructure {
    all: {[name: string]: number},
    one: {[name: string]: number},
    two: {[name: string]: number}
}

interface TopEmojis {
    all: {name: string, count: number}[],
    one: {name: string, count: number}[],
    two: {name: string, count: number}[]
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
    topEmojis: {name: string, count: number}[],
    topWords: TopWords
}

interface WordStructure {
    all: {[name: string]: number},
    one: {[name: string]: number},
    two: {[name: string]: number}
}

interface TopWords {
    all: {[name: string]: number},
    one: {[name: string]: number},
    two: {[name: string]: number}
}

interface MessagesWeekdays {
    totalMessagesByAll: number[];
    totalMessagesByAllOne: number[];
    totalMessagesByAllTwo: number[];
}
