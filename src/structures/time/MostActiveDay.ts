/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

/**
 * Returns object with date of most active day and count
 * @param {IMessageDateStructure} structure
 * @returns {MostActiveDay}
 * @constructor
 */
export function MostActiveDay(structure: MessageDateStructure): MostActiveDay {
    return {
        day: Object.keys(structure).sort((a, b) => structure[b].count - structure[a].count)[0],
        count: structure[Object.keys(structure).sort((a, b) => structure[b].count - structure[a].count)[0]].count,
    };
}
