import * as moment from 'moment';

const EmojiRegex: RegExp = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug;
const TimeRegex: RegExp = /([0-9][0-9].[0-9][0-9].[0-9][0-9])(, )([0-9][0-9]:[0-9][0-9])/g;

export function MainStructure (content: string, nameOneRegex: RegExp, nameTwoRegex: RegExp) : MainStructure[] {

    const SplitByNewline: string[] = content.split(/\n/g);
    let structure: MainStructure[] = [];

    for (let line of SplitByNewline) {

        const Time: string = line.replace(TimeRegex, '$1, $3').slice(0, 15);
        const Person: string = line.replace(TimeRegex, '$1, $3').slice(18).split(' ')[0];
        const Content: string = line.replace(TimeRegex, '$1, $3').replace(nameOneRegex, '').replace(nameTwoRegex, '');
        const DateCheck = moment(Time, 'DD.MM.YY, HH:mm');


        // The line is a new message and the date is therefore right
        if (DateCheck.isValid()) {
            // Making sure that the message is from a user and not a system message
            if (nameOneRegex.test(line) || nameTwoRegex.test(line)) {

                let _structure: any = {};

                _structure.chars = Content.replace(/\s/g, '').length;
                _structure.words = Content.replace(/[^A-Za-z0-9äöü ]/g, '').trim().split(' ').length;
                _structure.from = Person.slice(0, Person.length - 1);
                _structure.time = moment(Time, 'DD.MM.YY, HH:mm').valueOf();
                _structure.day = moment(Time, 'DD.MM.YY, HH:mm').day();
                _structure.hour = parseInt(Time.slice(10, 12));
                _structure.date = Time.slice(0, 8);
                _structure.content = Content;
                _structure.emojiNames = {};

                let _emojiCount: number = 0;
                let _match = EmojiRegex.exec(Content);
                while (_match !== null) {
                    // Only count emojis not unicode for skin color
                    if (!(['🏻', '🏽', '🏾', '🏿', '🏻'].indexOf(_match[0]) > -1)) {
                        _emojiCount++;
                        if (_structure.emojiNames[_match[0]]) _structure.emojiNames[_match[0]]++;
                        else _structure.emojiNames[_match[0]] = 1;
                    }
                    _match = EmojiRegex.exec(Content);
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
            let _match = EmojiRegex.exec(Content);
            while (_match !== null) {
                // Only count emojis not unicode for skin color
                if (!(['🏻', '🏽', '🏾', '🏿', '🏻'].indexOf(_match[0]) > -1)) {
                    _emojiCount++;
                    if (_structure.emojiNames[_match[0]]) _structure.emojiNames[_match[0]]++;
                    else _structure.emojiNames[_match[0]] = 1;
                }
                _match = EmojiRegex.exec(Content);
            }

            _structure.emoji += _emojiCount;

        }

    }

    return structure;

}
