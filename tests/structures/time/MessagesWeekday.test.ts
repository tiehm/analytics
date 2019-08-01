/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { MainStructure } from '../../../src/structures/main/MainStructure';
import { MessagesWeekday } from '../../../src/structures/time/MessagesWeekday';
import '../../../typings/structures';

describe('Messages Weekday Structure', () => {
    let structure: DefaultStructure[];
    let content: string;
    let MsgWeek: MessagesWeekdays;
    const nameOneRegex = /\s-\sCharlie:\s/g;
    const nameTwoRegex = /\s-\sPeter:\s/g;

    beforeAll(() => {
        content = readFileSync(join(__dirname, '../', 'chat/example.txt'), {
            encoding: 'utf-8',
        });
        structure = MainStructure(content, nameOneRegex, nameTwoRegex);
        MsgWeek = MessagesWeekday(structure, 'Charlie', 'Peter');
    });

    test('messages by all', () => {
        expect(MsgWeek.totalMessagesByAll.length).toBe(7);
    });

    test('messages by one', () => {
        expect(MsgWeek.totalMessagesByAllOne.length).toBe(7);
    });

    test('messages by two', () => {
        expect(MsgWeek.totalMessagesByAllTwo.length).toBe(7);
    });
});
