/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { EmojiStructure } from '../../../src/structures/emoji/EmojiStructure';
import { MainStructure } from '../../../src/structures/main/MainStructure';
import { GenerateRegExp } from '../../../src/structures/util/GenerateRegExp';
import '../../../typings/structures';

describe('Emoji structure', () => {
    let main: DefaultStructure[];
    let Emoji: TopEmojis;
    const { NameOneRegex, NameTwoRegex } = GenerateRegExp('Charlie', 'Peter');

    beforeAll(() => {
        main = MainStructure(
            readFileSync(join(__dirname, '../', '/chat/example.txt'), { encoding: 'utf-8' }),
            NameOneRegex,
            NameTwoRegex,
        );
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
