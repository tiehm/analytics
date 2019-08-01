/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

const possible = 'qwertzuiopasdfghjklyxcvbnm1234567890QWERTZUIOPASDFGHJKLYXCVBNM-.';

/**
 * Generate Random ID
 * @constructor
 * @return {String} Random ID
 */
export function IDGenerator(): string {
    return [...Array(10).keys()].map(() => possible[Math.floor(Math.random() * possible.length)]).join('');
}
