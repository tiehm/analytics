/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { MainStructure } from '../../../src/structures/main/MainStructure';
import { MessagesHour } from '../../../src/structures/time/MessagesHour';
import '../../../typings/structures';

describe('MessagesHour Structure', () => {
    let content: string;
    let structure: DefaultStructure[];
    let MsgHour: MessagesHour;
    const nameOneRegex = /\s-\sCharlie:\s/g;
    const nameTwoRegex = /\s-\sPeter:\s/g;

    beforeAll(() => {
        content = readFileSync(join(__dirname, '../', 'chat/example.txt'), {
            encoding: 'utf-8',
        });
        structure = MainStructure(content, nameOneRegex, nameTwoRegex);
        MsgHour = MessagesHour(structure, 'Charlie', 'Peter');
    });

    test('all hours', () => {
        expect(MsgHour.totalMessagesByAll.length).toBe(24);
        expect(MsgHour.totalMessagesByAll[0]).toBe(1);
        expect(MsgHour.totalMessagesByAll[14]).toBe(5);
        expect(MsgHour.totalMessagesByAll[12]).toBe(0);
        expect(MsgHour.totalMessagesByAll.reduce((a, b) => a + b)).toBe(122);
    });

    test('one hours', () => {
        expect(MsgHour.totalMessagesByOne.length).toBe(24);
        expect(MsgHour.totalMessagesByOne[0]).toBe(1);
        expect(MsgHour.totalMessagesByOne[14]).toBe(3);
        expect(MsgHour.totalMessagesByOne[11]).toBe(4);
        expect(MsgHour.totalMessagesByOne.reduce((a, b) => a + b)).toBe(67);
    });

    test('two hours', () => {
        expect(MsgHour.totalMessagesByTwo.length).toBe(24);
        expect(MsgHour.totalMessagesByTwo[0]).toBe(0);
        expect(MsgHour.totalMessagesByTwo[14]).toBe(2);
        expect(MsgHour.totalMessagesByTwo[11]).toBe(4);
        expect(MsgHour.totalMessagesByTwo.reduce((a, b) => a + b)).toBe(55);
    });
});
