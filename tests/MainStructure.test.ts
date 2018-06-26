import { join }        from 'path';
import {MainStructure} from '../src/structures/main/MainStructure';
import {readFileSync}  from 'fs';

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

describe('Testing Main Structure', () => {

    let content: string;
    let structure: MainStructure[];
    let nameOneRegex: RegExp = /\s-\sCharlie:\s/g;
    let nameTwoRegex: RegExp = /\s-\sPeter:\s/g;

    beforeAll(() => {
        content = readFileSync(join(__dirname, 'example.txt'), {encoding: 'utf-8'});
        structure = MainStructure(content, nameOneRegex, nameTwoRegex);
    });

    test('Total number of messages', () => {
        expect(structure.length).toBe(122);
        expect(structure.filter(_ => _.from === 'Charlie').length).toBe(67);
        expect(structure.filter(_ => _.from === 'Peter').length).toBe(122 - 67);
    });

    test('emojis', () => {
        expect(structure.map(_ => _.emoji).reduce((a, b) => a + b)).toBe(86);
        expect(Object.keys(structure[8].emojiNames).length).toBe(1);
        expect(Object.keys(structure[27].emojiNames).length).toBe(2);
    });

    test('word count', () => {
        expect(structure[1].words).toBe(1);
        expect(structure[9].words).toBe(6);
        expect(structure[3].words).toBe(7);
        expect(structure[8].words).toBe(0)
    });

    test('character count', () => {
        expect(structure[2].chars).toBe(4);
        expect(structure[8].chars).toBe(3)
    });

    test('dates', () => {
        expect(structure[2].date).toBe('25.10.16');
        expect(structure[14].date).toBe('20.12.16');
    });

    test('hours', () => {
        expect(structure[14].hour).toBe(23);
        expect(structure[121].hour).toBe(0);
    });

});
