import moment = require('moment');

export function MessageDateStructure (MainStructures: MainStructure[], TimeStructure: TimeStructure, nameOne: string, nameTwo: string): MessageDateStructure {

    let _structure: MessageDateStructure = {};
    for (let time of TimeStructure.timeValues) {

        let _topEmoji: {[name: string]: number} = {};
        let _totalMsg: number = 0;
        let _userOne: number = 0;
        let _userTwo: number = 0;
        let _totalWords: number = 0;
        let _words: {[name: string]: number} = {};
        let _chars: number = 0;
        let _charsOne: number = 0;
        let _charsTwo: number = 0;
        let _emojiCount: number = 0;
        let _topWord: string;

        for (let _mainStructure of MainStructures.filter(_ => _.date === time)) {
            _totalMsg++;
            _totalWords += _mainStructure.words;
            if (_mainStructure.from === nameOne) _userOne++;
            if (_mainStructure.from === nameTwo) _userTwo++;

            for (let emoji in _mainStructure.emojiNames) {
                if (_mainStructure.emojiNames.hasOwnProperty(emoji)) {
                    if (_topEmoji[emoji]) _topEmoji[emoji] += _mainStructure.emojiNames[emoji];
                    else _topEmoji[emoji] = _mainStructure.emojiNames[emoji] || 1;
                    _emojiCount += _mainStructure.emojiNames[emoji] || 0;
                }
            }

            for (let word of _mainStructure.content.replace(/[^A-Za-z0-9äöü ]/g, '').trim().split(' ')) {
                if (_words[word]) _words[word]++;
                else _words[word] = 1;
                _chars += word.length;
                if (_mainStructure.from === nameOne) _charsOne += word.length;
                if (_mainStructure.from === nameTwo) _charsTwo += word.length;
            }
            _topWord = Object.keys(_words).sort((a, b) => _words[b] - _words[a])[0];


        }

        _structure[time] = {
            emoji: {
                name: Object.keys(_topEmoji).sort((a, b) => _topEmoji[b] - _topWord[a]).slice(0, 1)[0] || null,
                count: _topEmoji[Object.keys(_topEmoji).sort((a, b) => _topEmoji[b] - _topWord[a]).slice(0, 1)[0]] || 0
            },
            emojiTotal: _emojiCount,
            timestamp: moment(time, 'DD.MM.YY').valueOf(),
            count: _totalMsg,
            userOne: _userOne,
            userTwo: _userTwo,
            wordsPerMessage: (_totalWords/_totalMsg).toFixed(2) || null,
            topWord: {
                word: _topWord,
                count: _words[_topWord] || null
            },
            charsPerMessage: {
                all: _chars/_totalMsg || 0,
                one: _charsOne/_userOne || 0,
                two: _charsTwo/_userTwo || 0
            }
        }

    }

    return _structure;

}
