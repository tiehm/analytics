/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

/**
 * Returns message count on each weekday, monday - sunday
 * @param {IMainStructure[]} structure
 * @param {string} nameOne Name of first person
 * @param {string} nameTwo Name of second person
 * @returns {IMessagesWeekdays}
 * @constructor
 */
export function MessagesWeekday(structure: DefaultStructure[], nameOne: string, nameTwo: string): MessagesWeekdays {
    function getDayCount(day: number, name?: string) {
        if (name) {
            return structure.filter(_ => _.day === day && _.from === name).length;
        } else {
            return structure.filter(_ => _.day === day).length;
        }
    }

    const totalMessagesByAll: number[] = [...Array(7).keys()].map(i => getDayCount(i));
    const totalMessagesByAllOne: number[] = [...Array(7).keys()].map(i => getDayCount(i, nameOne));
    const totalMessagesByAllTwo: number[] = [...Array(7).keys()].map(i => getDayCount(i, nameTwo));

    return {
        totalMessagesByAll,
        totalMessagesByAllOne,
        totalMessagesByAllTwo,
    };
}
