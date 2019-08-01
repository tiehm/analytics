/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { GenerateRegExp } from '../../../src/structures/util/GenerateRegExp';

test('Generate the Regular Expressions', () => {
    const { NameOneRegex, NameTwoRegex } = GenerateRegExp('Charlie', 'Peter');

    expect(NameOneRegex.toString()).toBe('/\\s-\\sCharlie:\\s/g');
    expect(NameTwoRegex.toString()).toBe('/\\s-\\sPeter:\\s/g');

    expect(NameOneRegex.toString()).not.toBe('/\\s-\\sPeter:\\s/g');
    expect(NameTwoRegex.toString()).not.toBe('/\\s-\\sCharlie:\\s/g');

    expect(NameOneRegex).toBeInstanceOf(RegExp);
    expect(NameTwoRegex).toBeInstanceOf(RegExp);
});
