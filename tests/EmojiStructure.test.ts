import {readFileSync} from 'fs';
import {EmojiStructure} from '../src/structures/emoji/EmojiStructure';
import {MainStructure}  from '../src/structures/main/MainStructure';
import {GenerateRegExp} from '../src/structures/util/GenerateRegExp';

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

interface TopEmojis {
    all: {name: string, count: number}[],
    one: {name: string, count: number}[],
    two: {name: string, count: number}[]
}

describe('Emoji structure', () => {

    let main: MainStructure[];
    let Emoji: TopEmojis;
    const {NameOneRegex, NameTwoRegex} = GenerateRegExp('Charlie', 'Peter');

    beforeAll(() => {
        main = MainStructure(readFileSync(__dirname + '/example.txt', {encoding: 'utf-8'}), NameOneRegex, NameTwoRegex);
        Emoji = EmojiStructure(main, 'Charlie', 'Peter');
    });

    test('top emoji', () => {
        expect(Emoji.all[0].count).toBe(35);
        expect(Emoji.all[0].name).toBe('😂');
    });

    test('top emoji person one', () => {
        expect(Emoji.one[1].count).toBe(3);
        expect(Emoji.one[0].name.charCodeAt(0)).toBe(55357);
    });

    test('top emoji person two', () => {
        expect(Emoji.two[0].count).toBe(32);
        expect(Emoji.two[0].name).toBe('😂');
    });

});
