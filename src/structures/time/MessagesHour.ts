/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

/**
 * Returns message count for each hour, 0 - 23
 * @param {IMainStructure[]} structure
 * @param {string} nameOne
 * @param {string} nameTwo
 * @returns {MessagesHour}
 * @constructor
 */
export function MessagesHour(structure: DefaultStructure[], nameOne: string, nameTwo: string): MessagesHour {
    function getHourCount(hour: number, name?: string) {
        if (name) {
            return structure.filter(_ => _.hour === hour && _.from === name).length;
        } else {
            return structure.filter(_ => _.hour === hour).length;
        }
    }

    const totalMessagesByAll = [...Array(24).keys()].map(i => getHourCount(i));
    const totalMessagesByOne = [...Array(24).keys()].map(i => getHourCount(i, nameOne));
    const totalMessagesByTwo = [...Array(24).keys()].map(i => getHourCount(i, nameTwo));

    return {
        totalMessagesByAll,
        totalMessagesByOne,
        totalMessagesByTwo,
    };
}
