import * as moment from 'moment';

const TimeRegex: RegExp = /[0-9][0-9].[0-9][0-9].[0-9][0-9], [0-9][0-9]:[0-9][0-9]/g;
const TimeReplace: RegExp = /([0-9][0-9].[0-9][0-9].[0-9][0-9])(, )([0-9][0-9]:[0-9][0-9])/g;

export function TimeStructure (content: string) : TimeStructure {
    let firstMessage : string = content.match(TimeRegex).shift().replace(TimeReplace, '$1, $3');
    let firstMessageTS = moment(content.match(TimeRegex).shift().replace(TimeReplace, '$1, $3'), 'DD.MM.YY, HH:mm').valueOf();
    let lastMessage : string = content.match(TimeRegex).pop().replace(TimeReplace, '$1, $3');
    let now = moment().valueOf();

    let timeValues : string[] = [];
    while (firstMessageTS < now) {
        timeValues.push(moment(firstMessageTS).format('DD.MM.YY'));
        firstMessageTS = moment(firstMessageTS).add(1, 'day').valueOf();
    }
    return {
        timeValues,
        firstMessage,
        lastMessage
    }
}
