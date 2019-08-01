/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { MainStructure } from '../../../src/structures/main/MainStructure';
import { MessageDateStructure } from '../../../src/structures/time/MessageDateStructure';
import { TimeStructure } from '../../../src/structures/time/TimeStructure';
import '../../../typings/structures';

describe('Message Date Structure', () => {
    let content: string;
    let structure: DefaultStructure[];
    let MsgDate: MessageDateStructure;
    let TimestampStr: TimeStructure;
    const nameOneRegex = /\s-\sCharlie:\s/g;
    const nameTwoRegex = /\s-\sPeter:\s/g;

    beforeAll(() => {
        content = readFileSync(join(__dirname, '../', 'chat/example.txt'), {
            encoding: 'utf-8',
        });
        structure = MainStructure(content, nameOneRegex, nameTwoRegex);
        TimestampStr = TimeStructure(content);
        MsgDate = MessageDateStructure(structure, TimestampStr, 'Charlie', 'Peter');
    });

    test('top emoji', () => {
        expect(MsgDate['02.12.16'].emoji.count).toBe(4);
        expect(MsgDate['02.12.16'].emoji.name).toBe('😂');

        expect(MsgDate['21.12.16'].emoji.name).toBe(null);
        expect(MsgDate['21.12.16'].emoji.count).toBe(0);

        expect(MsgDate['01.01.90']).toBe(undefined);
    });

    test('total emoji count', () => {
        expect(MsgDate['25.10.16'].emojiTotal).toBe(0);
        expect(MsgDate['26.10.16'].emojiTotal).toBe(0);
        expect(MsgDate['28.07.17'].emojiTotal).toBe(13);
    });

    test('timestamp', () => {
        expect(MsgDate['28.07.17'].timestamp).toBe(1501236000000);
        expect(MsgDate['10.10.17'].timestamp).toBe(1507629600000);
    });

    test('message count', () => {
        expect(MsgDate['13.12.17'].count).toBe(7);
        expect(MsgDate['28.11.17'].count).toBe(24);
    });

    test('message count per user', () => {
        expect(MsgDate['28.11.17'].userOne).toBe(13);
        expect(MsgDate['29.11.17'].userOne).toBe(6);

        expect(MsgDate['28.11.17'].userTwo).toBe(11);
        expect(MsgDate['29.11.17'].userTwo).toBe(3);
    });

    test('words per message', () => {
        expect(MsgDate['20.11.17'].wordsPerMessage).toBeNull();
        expect(MsgDate['21.11.17'].wordsPerMessage).toBe('4.83');
    });

    test('characters per message per person', () => {
        expect(MsgDate['20.11.17'].charsPerMessage.all).toBe(0);
        expect(MsgDate['20.11.17'].charsPerMessage.one).toBe(0);
        expect(MsgDate['20.11.17'].charsPerMessage.two).toBe(0);

        expect(MsgDate['21.11.17'].charsPerMessage.one).toBe(201 / 5);
        expect(MsgDate['21.11.17'].charsPerMessage.two).toBe(88 / 7);
        expect(MsgDate['21.11.17'].charsPerMessage.all).toBe(289 / 12);
    });

    test('top word', () => {
        expect(MsgDate['20.11.17'].topWord.count).toBeNull();
        expect(MsgDate['20.11.17'].topWord.word).toBeUndefined();

        expect(MsgDate['21.11.17'].topWord.word).toBe('in');
        expect(MsgDate['21.11.17'].topWord.count).toBe(4);
    });
});
