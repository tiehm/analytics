/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as moment from 'moment-timezone';

/**
 * Return per day chat data on all days from chat begin to now, also includes days without any messages
 * @param {IMainStructure[]} MainStructures Array of MainStructures
 * @param {ITimeStructure} TimeStructure TimeStructure Object
 * @param {string} nameOne Name of first person
 * @param {string} nameTwo Name of second person
 * @returns {MessageDateStructure}
 * @constructor
 */
export function MessageDateStructure(
    MainStructures: DefaultStructure[],
    TimeStructure: TimeStructure,
    nameOne: string,
    nameTwo: string,
): MessageDateStructure {
    moment.tz.setDefault('Europe/Berlin');
    const _structure: MessageDateStructure = {};
    for (const time of TimeStructure.timeValues) {
        // Setting emojis with emoji as key and number as value
        const _topEmoji: { [name: string]: number } = {};
        // Total messages
        let _totalMsg = 0;
        // name of first user
        let _userOne = 0;
        // name of second user
        let _userTwo = 0;
        // count of total words used
        let _totalWords = 0;
        // setting words with the word as key and number as value
        const _words: { [name: string]: number } = {};
        // total number of characters
        let _chars = 0;
        // total number of character by first person
        let _charsOne = 0;
        // total number of character by second person
        let _charsTwo = 0;
        // total count of emojis
        let _emojiCount = 0;
        // the most used word
        let _topWord: string;

        for (const _mainStructure of MainStructures.filter(_ => _.date === time)) {
            _totalMsg++;
            _totalWords += _mainStructure.words;
            if (_mainStructure.from === nameOne) _userOne++;
            if (_mainStructure.from === nameTwo) _userTwo++;

            for (const emoji in _mainStructure.emojiNames) {
                if (!_mainStructure.emojiNames.hasOwnProperty(emoji)) continue;
                if (_topEmoji[emoji]) _topEmoji[emoji] += _mainStructure.emojiNames[emoji];
                else _topEmoji[emoji] = _mainStructure.emojiNames[emoji] || 1;
                _emojiCount += _mainStructure.emojiNames[emoji] || 0;
            }

            for (const word of _mainStructure.content
                .replace(/[^A-Za-z0-9äöü ]/g, '')
                .trim()
                .split(' ')) {
                if (_words[word]) _words[word]++;
                else _words[word] = 1;
                _chars += word.length;
                if (_mainStructure.from === nameOne) _charsOne += word.length;
                if (_mainStructure.from === nameTwo) _charsTwo += word.length;
            }
            _topWord = Object.keys(_words).sort((a, b) => _words[b] - _words[a])[0] || null;
        }

        _structure[time] = {
            // Setting emoji as an object with the top emoji name and count
            emoji: {
                name:
                    Object.keys(_topEmoji)
                        .sort((a, b) => _topEmoji[b] - _topEmoji[a])
                        .slice(0, 1)[0] || null,
                count:
                    _topEmoji[
                        Object.keys(_topEmoji)
                            .sort((a, b) => _topEmoji[b] - _topEmoji[a])
                            .slice(0, 1)[0]
                    ] || 0,
            },
            emojiTotal: _emojiCount,
            timestamp: moment(time + ' 12:00:00', 'DD.MM.YY HH:mm:ss').valueOf(),
            count: _totalMsg,
            userOne: _userOne,
            userTwo: _userTwo,
            // Calculating the words per Message
            wordsPerMessage: isNaN(_totalWords / _totalMsg) ? null : (_totalWords / _totalMsg).toFixed(2),
            // Setting topWord as an object with the top word name and count
            topWord: {
                word: _topWord,
                count: _words[_topWord] || null,
            },
            // Calculating the characters used per message
            charsPerMessage: {
                all: _chars / _totalMsg || 0,
                one: _charsOne / _userOne || 0,
                two: _charsTwo / _userTwo || 0,
            },
        };
    }

    return _structure;
}
