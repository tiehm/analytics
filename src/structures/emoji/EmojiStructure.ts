/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

/**
 * Returns all emojis in an array sorted by their count, emojis for all - person one and person two
 * @param {IMainStructure[]} MainStructures Array of MainStructures
 * @param {string} nameOne Name of first person
 * @param {string} nameTwo Name of second person
 * @returns {ITopEmojis}
 * @constructor
 */
export function EmojiStructure(MainStructures: DefaultStructure[], nameOne: string, nameTwo: string): TopEmojis {
    const emojis: EmojiStructure = {
        all: {},
        one: {},
        two: {},
    };

    // Loop over each message in the chat
    for (const structure of MainStructures) {
        // Loop over each emoji name used in a message
        for (const emoji in structure.emojiNames) {
            if (!structure.emojiNames.hasOwnProperty(emoji)) continue;

            /**
             * Setting emojis and their total count for all, and each user
             */

            if (emojis.all[emoji]) emojis.all[emoji] += structure.emojiNames[emoji];
            else emojis.all[emoji] = structure.emojiNames[emoji] || 1;

            if (structure.from === nameOne) {
                if (emojis.one[emoji]) emojis.one[emoji] += structure.emojiNames[emoji];
                else emojis.one[emoji] = structure.emojiNames[emoji] || 1;
            }

            if (structure.from === nameTwo) {
                if (emojis.two[emoji]) emojis.two[emoji] += structure.emojiNames[emoji];
                else emojis.two[emoji] = structure.emojiNames[emoji] || 1;
            }
        }
    }

    const top: TopEmojis = {
        all: [],
        one: [],
        two: [],
    };

    /**
     * Sort all emojis from top count to low count
     */

    for (const emoji of Object.keys(emojis.all).sort((a, b) => emojis.all[b] - emojis.all[a])) {
        top.all.push({ name: emoji, count: emojis.all[emoji] });
    }

    for (const emoji of Object.keys(emojis.one).sort((a, b) => emojis.one[b] - emojis.one[a])) {
        top.one.push({ name: emoji, count: emojis.one[emoji] });
    }

    for (const emoji of Object.keys(emojis.two).sort((a, b) => emojis.two[b] - emojis.two[a])) {
        top.two.push({ name: emoji, count: emojis.two[emoji] });
    }

    return top;
}
