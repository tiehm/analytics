/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

/**
 * Extend an object with another object
 * @param obj {Object} The original object to extend
 * @param src {Object} The object to extend the original one with
 * @return {Object} Extended Object
 */
export function extend(obj: unknown, src: unknown): unknown {
    Object.keys(src).forEach(key => {
        obj[key] = src[key];
    });
    return obj;
}
