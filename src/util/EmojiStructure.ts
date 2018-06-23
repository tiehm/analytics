export function EmojiStructure (MainStructures: MainStructure[], nameOne: string, nameTwo: string) : EmojiStructure {

    let _total: number = 0;
    let _one: number = 0;
    let _two: number = 0;
    let _topEmojis = {};
    for (let structure of MainStructures) {
        _total++;
        for (let emoji in structure.emojiNames) {
            if (structure.emojiNames.hasOwnProperty(emoji)) {
                if (_topEmojis[emoji]) _topEmojis[emoji] += structure.emojiNames[emoji];
                else _topEmojis[emoji] = structure.emojiNames[emoji] || 1;

                if (structure.from === nameOne) _one++;
                if (structure.from === nameTwo) _two++;
            }
        }
    }

    return {
        topEmojis: _topEmojis,
        emojisSentOne: _one,
        emojisSentTwo: _two
    };

}
