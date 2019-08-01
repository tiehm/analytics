/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { readFileSync } from 'fs';
import * as moment from 'moment-timezone';
import { join } from 'path';
import { TimeStructure } from '../../../src/structures/time/TimeStructure';

describe('Time structure', () => {
    moment.tz.setDefault('Europe/Berlin');

    let content: string;
    let structure;

    beforeAll(() => {
        content = readFileSync(join(__dirname, '../', 'chat/example.txt'), { encoding: 'utf-8' });
        structure = TimeStructure(content);
    });

    test('first message date time', () => {
        expect(structure.firstMessage).toBe('25.10.16, 19:23');
    });

    test('last message date time', () => {
        expect(structure.lastMessage).toBe('20.12.17, 00:05');
    });

    test('timestamp array', () => {
        expect(structure.timeValues.length).toBe(moment().diff(moment('25.10.16', 'DD.MM.YY'), 'days'));
    });
});
