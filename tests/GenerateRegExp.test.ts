import { GenerateRegExp } from '../src/structures/util/GenerateRegExp';

test('Generate the Regular Expressions', () => {
    const {NameOneRegex, NameTwoRegex} = GenerateRegExp('Charlie', 'Peter');

    expect(NameOneRegex.toString()).toBe('/\\s-\\sCharlie:\\s/g');
    expect(NameTwoRegex.toString()).toBe('/\\s-\\sPeter:\\s/g');

    expect(NameOneRegex.toString()).not.toBe('/\\s-\\sPeter:\\s/g');
    expect(NameTwoRegex.toString()).not.toBe('/\\s-\\sCharlie:\\s/g');
});
