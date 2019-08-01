/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { MainStructure } from '../../../src/structures/main/MainStructure';
import { WordStructure } from '../../../src/structures/word/WordStructure';
import '../../../typings/structures';

describe('Word structure', () => {
    let content: string;
    let structure: DefaultStructure[];
    let wordStructure: WordStructure;

    beforeAll(() => {
        const nameOneRegex = /\s-\sCharlie:\s/g;
        const nameTwoRegex = /\s-\sPeter:\s/g;
        content = readFileSync(join(__dirname, '../', 'chat/example.txt'), {
            encoding: 'utf-8',
        });
        structure = MainStructure(content, nameOneRegex, nameTwoRegex);
        wordStructure = WordStructure(structure, 'Charlie', 'Peter');
    });

    test('Word Structure all', () => {
        expect(wordStructure.all.nice).toBe(1);
        expect(wordStructure.all.roflxd).toBeUndefined();
        expect(wordStructure.all).toBeInstanceOf(Object);
        expect(Object.keys(wordStructure.all).length).toBeGreaterThan(100);
    });

    test('Word Structure one', () => {
        expect(wordStructure.one.nice).toBeUndefined();
        expect(wordStructure.one.roflxd).toBeUndefined();
        expect(wordStructure.one).toBeInstanceOf(Object);
        expect(Object.keys(wordStructure.one).length).toBeGreaterThan(100);
    });

    test('Word Structure two', () => {
        expect(wordStructure.two.nice).toBe(1);
        expect(wordStructure.two.roflxd).toBeUndefined();
        expect(wordStructure.two).toBeInstanceOf(Object);
        expect(Object.keys(wordStructure.two).length).toBeGreaterThan(100);
    });
});
