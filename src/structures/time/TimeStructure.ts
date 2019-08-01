/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as moment from 'moment-timezone';

const TimeRegex = /[0-9][0-9].[0-9][0-9].[0-9][0-9], [0-9][0-9]:[0-9][0-9]/g;
const TimeReplace = /([0-9][0-9].[0-9][0-9].[0-9][0-9])(, )([0-9][0-9]:[0-9][0-9])/g;

/**
 * Returns array of timestamp from first message to now, first message and last message
 * @param {string} content
 * @returns {TimeStructure}
 * @constructor
 */
export function TimeStructure(content: string): TimeStructure {
    moment.tz.setDefault('Europe/Berlin');

    const firstMessage: string = content
        .match(TimeRegex)
        .shift()
        .replace(TimeReplace, '$1, $3');
    let firstMessageTS = moment(
        content
            .match(TimeRegex)
            .shift()
            .replace(TimeReplace, '$1, $3'),
        'DD.MM.YY, HH:mm',
    ).valueOf();
    const lastMessage: string = content
        .match(TimeRegex)
        .pop()
        .replace(TimeReplace, '$1, $3');
    const now = moment().valueOf();

    const timeValues: string[] = [];
    while (firstMessageTS < now) {
        timeValues.push(moment(firstMessageTS).format('DD.MM.YY'));
        firstMessageTS = moment(firstMessageTS)
            .add(1, 'day')
            .valueOf();
    }
    return {
        timeValues,
        firstMessage,
        lastMessage,
    };
}
