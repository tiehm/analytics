/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { MainStructure } from '../../../src/structures/main/MainStructure';
import { TopWords } from '../../../src/structures/word/TopWords';
import { WordStructure } from '../../../src/structures/word/WordStructure';
import '../../../typings/structures';

describe('TopWords structure', () => {
    let content: string;
    let structure: DefaultStructure[];
    let wordStructure: WordStructure;
    let topWords: TopWords;

    beforeAll(() => {
        const nameOneRegex = /\s-\sCharlie:\s/g;
        const nameTwoRegex = /\s-\sPeter:\s/g;
        content = readFileSync(join(__dirname, '../', 'chat/example.txt'), {
            encoding: 'utf-8',
        });
        structure = MainStructure(content, nameOneRegex, nameTwoRegex);
        wordStructure = WordStructure(structure, 'Charlie', 'Peter');
        topWords = TopWords(wordStructure);
    });

    test('Top Word by all', () => {
        expect(topWords.all.ich).toBe(19);
        expect(topWords.all.du).toBe(17);
        expect(topWords.all.Eyaaaaaa).toBeUndefined();
        expect(Object.keys(topWords.all).length).toBe(15);
    });

    test('Top Word by one', () => {
        expect(topWords.one.ich).toBe(10);
        expect(topWords.one.Eyaaaaaa).toBeUndefined();
        expect(Object.keys(topWords.one).length).toBe(15);
    });

    test('Top Word by two', () => {
        expect(topWords.two.ich).toBe(9);
        expect(topWords.two.Eyaaaaaa).toBeUndefined();
        expect(Object.keys(topWords.two).length).toBe(15);
    });
});
