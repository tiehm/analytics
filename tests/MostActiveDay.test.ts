import {readFileSync}         from 'fs';
import {MainStructure}        from '../src/structures/main/MainStructure';
import {GenerateRegExp}       from '../src/structures/util/GenerateRegExp';
import {MostActiveDay}        from '../src/structures/time/MostActiveDay';
import {TimeStructure}        from '../src/structures/time/TimeStructure';
import {MessageDateStructure} from '../src/structures/time/MessageDateStructure';

interface MostActiveDay {
    day: string;
    count: number;
}
interface TimeStructure {
    timeValues: string[];
    firstMessage: string;
    lastMessage: string;
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

describe('Testing most active day data', () => {

    let content: string;
    let structure: MainStructure[];
    let timeStructure: TimeStructure;
    let msgDateStructure: MessageDateStructure;
    let mostActive: MostActiveDay;

    beforeAll(() => {
        const {NameTwoRegex, NameOneRegex} = GenerateRegExp('Charlie', 'Peter');
        content = readFileSync(__dirname + '/example.txt', {encoding: 'utf-8'});
        structure = MainStructure(content, NameOneRegex, NameTwoRegex);
        timeStructure = TimeStructure(content);
        msgDateStructure = MessageDateStructure(structure, timeStructure, 'Charlie', 'Peter');
        mostActive = MostActiveDay(msgDateStructure);
    });

    test('date count', () => {
        expect(mostActive.day).toBe('28.11.17');
        expect(mostActive.count).toBe(24)
    });

});
