/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

function sortAndSlice(obj: any): string[] {
    return Object.keys(obj)
        .sort((a, b) => obj[b] - obj[a])
        .slice(0, 15);
}

function loop(sorted: string[], topWords: any, words: any): void {
    for (const word of sorted) topWords[word] = words[word];
}

/**
 * Returning object with the top used words and their count
 * @param {IWordStructure} words
 * @returns {TopWords}
 * @constructor
 */
export function TopWords(words: WordStructure): TopWords {
    const topWords = {
        all: {},
        one: {},
        two: {},
    };

    const SortedWordsAll: string[] = sortAndSlice(words.all);
    const SortedWordsOne: string[] = sortAndSlice(words.one);
    const SortedWordsTwo: string[] = sortAndSlice(words.two);

    loop(SortedWordsAll, topWords.all, words.all);
    loop(SortedWordsOne, topWords.one, words.one);
    loop(SortedWordsTwo, topWords.two, words.two);

    return topWords;
}
