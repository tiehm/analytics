import * as moment from 'moment';
import emojiRegex = require('emoji-regex');

const TimeRegex: RegExp = /([0-9][0-9].[0-9][0-9].[0-9][0-9])(, )([0-9][0-9]:[0-9][0-9])/g;

export function MainStructure (content: string, nameOneRegex: RegExp, nameTwoRegex: RegExp) : MainStructure[] {

    const SplitByNewline: string[] = content.split(/\n/g);
    let structure: MainStructure[] = [];

    for (let line of SplitByNewline) {

        const Time: string = line.replace(TimeRegex, '$1, $3').slice(0, 15);
        const Person: string = line.replace(TimeRegex, '$1, $3').slice(18).split(' ')[0];
        const Content: string = line.replace(TimeRegex, '').replace(nameOneRegex, '').replace(nameTwoRegex, '');
        const DateCheck = moment(Time, 'DD.MM.YY, HH:mm');

        // The line is a new message and the date is therefore right
        if (DateCheck.isValid()) {
            // Making sure that the message is from a user and not a system message
            if (nameOneRegex.test(line) || nameTwoRegex.test(line)) {

                let _structure: any = {};

                _structure.chars = Content.replace(/\s/g, '').replace(emojiRegex(), 'E').length;
                _structure.words = Content.replace(/[^A-Za-z0-9äöü ]/g, '').trim().split(' ').filter(i => i).length;
                _structure.from = Person.slice(0, Person.length - 1);
                _structure.time = moment(Time, 'DD.MM.YY, HH:mm').valueOf();
                _structure.day = moment(Time, 'DD.MM.YY, HH:mm').day();
                _structure.hour = parseInt(Time.slice(10, 12));
                _structure.date = Time.slice(0, 8);
                _structure.content = Content;
                _structure.emojiNames = {};

                let _emojiCount: number = 0;
                let _match;
                let regex = emojiRegex();
                while (_match = regex.exec(Content)) {
                    _emojiCount++;
                    if (_structure.emojiNames[_match[0]]) _structure.emojiNames[_match[0]]++;
                    else _structure.emojiNames[_match[0]] = 1;
                }

                _structure.emoji = _emojiCount;

                structure.push(_structure as MainStructure);

            }

        } else {

            let _structure = structure[structure.length - 1];

            _structure.chars += Content.replace(/\s/g, '').length;
            _structure.words += Content.replace(/[^A-Za-z0-9äöü ]/g, '').trim().split(' ').length;
            _structure.content += '\n' + Content;

            let _emojiCount: number = 0;
            let _match;
            let regex = emojiRegex();
            while (_match = regex.exec(Content)) {
                _emojiCount++;
                if ([..._match[0]].length === 2) _match[0] = [..._match[0]][0];
                if (_structure.emojiNames[_match[0]]) _structure.emojiNames[_match[0]]++;
                else _structure.emojiNames[_match[0]] = 1;
            }

            _structure.emoji += _emojiCount;

        }

    }

    return structure;

}
