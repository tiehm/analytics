/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

/**
 * Returns object with word as key and count as value
 * @param {IMainStructure[]} Main
 * @param {string} nameOne name of first person
 * @param {string} nameTwo name of second person
 * @returns {WordStructure}
 * @constructor
 */
export function WordStructure(Main: DefaultStructure[], nameOne: string, nameTwo: string): WordStructure {
    const words = {
        all: {},
        one: {},
        two: {},
    };
    for (const structure of Main) {
        for (const word in (structure as DefaultStructure).topWords) {
            if (!structure.topWords.hasOwnProperty(word)) continue;
            if (words.all[word]) words.all[word] += structure.topWords[word];
            else words.all[word] = structure.topWords[word];

            if (structure.from === nameOne) {
                if (words.one[word]) words.one[word] += structure.topWords[word];
                else words.one[word] = structure.topWords[word];
            }

            if (structure.from === nameTwo) {
                if (words.two[word]) words.two[word] += structure.topWords[word];
                else words.two[word] = structure.topWords[word];
            }
        }
    }

    return words;
}
