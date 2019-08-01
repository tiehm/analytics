/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

/**
 * Returns Regex for replacement of user one and two
 * @param {string} nameOne
 * @param {string} nameTwo
 * @returns {{NameOneRegex: RegExp, NameTwoRegex: RegExp}}
 * @constructor
 */
export function GenerateRegExp(
    nameOne: string,
    nameTwo: string,
): {
    NameOneRegex: RegExp;
    NameTwoRegex: RegExp;
} {
    return {
        NameOneRegex: new RegExp('\\s-\\s' + nameOne + ':\\s', 'g'),
        NameTwoRegex: new RegExp('\\s-\\s' + nameTwo + ':\\s', 'g'),
    };
}
