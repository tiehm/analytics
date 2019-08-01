/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { MainStructure } from '../../../src/structures/main/MainStructure';
import { MessageDateStructure } from '../../../src/structures/time/MessageDateStructure';
import { MostActiveDay } from '../../../src/structures/time/MostActiveDay';
import { TimeStructure } from '../../../src/structures/time/TimeStructure';
import { GenerateRegExp } from '../../../src/structures/util/GenerateRegExp';
import '../../../typings/structures';

describe('Testing most active day data', () => {
    let content: string;
    let structure: DefaultStructure[];
    let timeStructure: TimeStructure;
    let msgDateStructure: MessageDateStructure;
    let mostActive: MostActiveDay;

    beforeAll(() => {
        const { NameTwoRegex, NameOneRegex } = GenerateRegExp('Charlie', 'Peter');
        content = readFileSync(join(__dirname, '../', 'chat/example.txt'), { encoding: 'utf-8' });
        structure = MainStructure(content, NameOneRegex, NameTwoRegex);
        timeStructure = TimeStructure(content);
        msgDateStructure = MessageDateStructure(structure, timeStructure, 'Charlie', 'Peter');
        mostActive = MostActiveDay(msgDateStructure);
    });

    test('date count', () => {
        expect(mostActive.day).toBe('28.11.17');
        expect(mostActive.count).toBe(24);
    });
});
