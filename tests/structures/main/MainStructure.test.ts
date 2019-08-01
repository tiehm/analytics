/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { MainStructure } from '../../../src/structures/main/MainStructure';
import '../../../typings/structures';

describe('Testing Main Structure', () => {
    let content: string;
    let structure: DefaultStructure[];
    const nameOneRegex = /\s-\sCharlie:\s/g;
    const nameTwoRegex = /\s-\sPeter:\s/g;

    beforeAll(() => {
        content = readFileSync(join(__dirname, '../', '/chat/example.txt'), {
            encoding: 'utf-8',
        });
        structure = MainStructure(content, nameOneRegex, nameTwoRegex);
    });

    test('message author', () => {
        expect(structure[72].from).toBe('Charlie');
        expect(structure[66].from).toBe('Peter');
    });

    test('timestamp', () => {
        expect(structure[72].time).toBe(1511605020000);
    });

    test('day', () => {
        expect(structure[64].day).toBe(2);
        expect(structure[47].day).toBe(0);
    });

    test('content', () => {
        expect(structure[12].content).toBe('Dankööö');
        expect(structure[87].content).toBe('😂😂sie antwortet mir nich😩');
    });

    test('Total number of messages', () => {
        expect(structure.length).toBe(122);
        expect(structure.filter(_ => _.from === 'Charlie').length).toBe(67);
        expect(structure.filter(_ => _.from === 'Peter').length).toBe(122 - 67);
    });

    test('emojis', () => {
        expect(structure.map(_ => _.emoji).reduce((a, b) => a + b)).toBe(89);
        expect(Object.keys(structure[8].emojiNames).length).toBe(1);
        expect(Object.keys(structure[27].emojiNames).length).toBe(2);
    });

    test('word count', () => {
        expect(structure[1].words).toBe(1);
        expect(structure[9].words).toBe(6);
        expect(structure[3].words).toBe(7);
        expect(structure[8].words).toBe(0);
    });

    test('character count', () => {
        expect(structure[2].chars).toBe(4);
        expect(structure[8].chars).toBe(3);
        expect(structure[18].chars).toBe(23);
        expect(structure[44].chars).toBe(0);
    });

    test('dates', () => {
        expect(structure[2].date).toBe('25.10.16');
        expect(structure[14].date).toBe('20.12.16');
    });

    test('hours', () => {
        expect(structure[14].hour).toBe(23);
        expect(structure[121].hour).toBe(0);
    });

    test('top words', () => {
        expect(structure[34].topWords.ich).toBe(2);
        expect(structure[31].topWords.ich).toBe(undefined);
        expect(structure[73].topWords['😑']).toBe(undefined);
    });
});
