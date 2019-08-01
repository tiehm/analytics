/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as moment from 'moment-timezone';

import emojiRegex = require('emoji-regex');

const TimeRegex = /([0-9][0-9].[0-9][0-9].[0-9][0-9])(, )([0-9][0-9]:[0-9][0-9])/g;

/**
 * Getting the person who wrote the chat message
 * @param {string} line Chat message line split by newlines
 * @return {string}
 */
function getPerson(line: string): string {
    const Person: string = line
        .replace(TimeRegex, '$1, $3')
        .slice(18)
        .split(' ')[0];
    return Person.slice(0, Person.length - 1);
}

/**
 * Getting the Date and Time in format DD.MM.YY, HH:ss
 * @param {string} line Chat message line split by newlines
 * @return {string}
 */
function getTime(line: string): string {
    return line.replace(TimeRegex, '$1, $3').slice(0, 15);
}

/**
 * Getting content from a chat message, clean it to remove special characters
 * @param {string} line
 * @param {RegExp} nameOneRegex
 * @param {RegExp} nameTwoRegex
 * @return {string}
 */
function getCleanContent(line: string, nameOneRegex: RegExp, nameTwoRegex: RegExp): string {
    return line
        .replace(TimeRegex, '')
        .replace(nameOneRegex, '')
        .replace(nameTwoRegex, '')
        .replace(/<Medien ausgeschlossen>/g, '');
}

/**
 * Getting count of character used in a message
 * @param {string} content
 * @return {number}
 */
function getCharacterCount(content: string): number {
    // @ts-ignore
    return content.replace(/\s/g, '').replace(emojiRegex(), 'E').length;
}

/**
 * Getting count of words used in a message
 * @param {string} content
 * @return {number}
 */
function getWordCount(content: string): number {
    return content
        .replace(/[^A-Za-z0-9äöü ]/g, ' ')
        .trim()
        .split(' ')
        .filter(i => !!i).length;
}

/**
 * Getting words in a message
 * @param {string} content
 * @return {string[]}
 */
function getWords(content: string): string[] {
    return content
        .replace(/[^A-Za-z0-9äöü ]/g, ' ')
        .trim()
        .split(' ')
        .filter(i => !!i);
}

/**
 * The Main Structure is used in the entire Analysis as it provides per message data
 * @param {string} content
 * @param {RegExp} nameOneRegex
 * @param {RegExp} nameTwoRegex
 * @return {MainStructure[]}
 * @constructor
 */
export function MainStructure(content: string, nameOneRegex: RegExp, nameTwoRegex: RegExp): DefaultStructure[] {
    moment.tz.setDefault('Europe/Berlin');

    const SplitByNewline: string[] = content.split(/\n/g);
    const structure: DefaultStructure[] = [];

    // Process each line of the chat file
    for (const line of SplitByNewline) {
        const Time: string = getTime(line);
        const Person: string = getPerson(line);
        const Content: string = getCleanContent(line, nameOneRegex, nameTwoRegex);
        const DateCheck = moment(Time, 'DD.MM.YY, HH:mm');
        const AutoMessage =
            'Nachrichten in diesem Chat sowie Anrufe sind jetzt ' +
            'mit Ende-zu-Ende-Verschlüsselung geschützt. Tippe für mehr Infos.';
        // Stop the processing of the message if it is a system message
        if (Content.slice(3) === AutoMessage) continue;

        // The Date is not valid if the message is just the last message but continued in a new line
        if (DateCheck.isValid()) {
            const _structure: any = {};

            _structure.chars = getCharacterCount(Content);
            _structure.words = getWordCount(Content);
            _structure.from = Person;
            _structure.time = moment(Time, 'DD.MM.YY, HH:mm').valueOf();
            // -1 as Monday returns 1, we need this data and parse it into an array which starts at 0, Sunday = 6
            _structure.day = moment(Time, 'DD.MM.YY, HH:mm').isoWeekday() - 1;
            // Parsing the hour when the chat message was sent to a number [0 - 23]
            _structure.hour = parseInt(Time.slice(10, 12), 10);
            // Extracting date from message timestamp
            _structure.date = Time.slice(0, 8);
            _structure.content = Content;
            _structure.emojiNames = {};
            _structure.topWords = {};

            // Loop over every word and map them by their content to getData the total count of specific words.
            for (const word of getWords(Content)) {
                if (_structure.topWords[word.toLowerCase()]) _structure.topWords[word.toLowerCase()]++;
                else _structure.topWords[word.toLowerCase()] = 1;
            }

            let _emojiCount = 0;
            let _match;
            // @ts-ignore
            const regex: RegExp = emojiRegex();
            while ((_match = regex.exec(Content))) {
                _emojiCount++;
                // This uses the first character of an emoji if it has 2 so skin tone for example makes no difference
                const match = [..._match[0]][0];
                if (_structure.emojiNames[match]) _structure.emojiNames[match]++;
                else _structure.emojiNames[match] = 1;
            }

            _structure.emoji = _emojiCount;

            structure.push(_structure as DefaultStructure);
        } else {
            const _structure = structure[structure.length - 1];

            _structure.chars += getCharacterCount(Content);
            _structure.words += getWordCount(Content);
            _structure.content += '\n' + Content;

            // Loop over every word and map them by their content to getData the total count of specific words.
            for (const word of getWords(Content)) {
                if (_structure.topWords[word.toLowerCase()]) _structure.topWords[word.toLowerCase()]++;
                else _structure.topWords[word.toLowerCase()] = 1;
            }

            let _emojiCount = 0;
            let _match;
            // @ts-ignore
            const regex: RegExp = emojiRegex();
            while ((_match = regex.exec(Content))) {
                _emojiCount++;
                // This uses the first character of an emoji if it has 2 so skin tone for example makes no difference
                const match = [..._match[0]][0];
                if (_structure.emojiNames[match]) _structure.emojiNames[match]++;
                else _structure.emojiNames[match] = 1;
            }

            _structure.emoji += _emojiCount;
        }
    }

    return structure;
}
