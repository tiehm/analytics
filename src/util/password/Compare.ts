/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as bcrypt from 'bcrypt';

/**
 * Compare plain password to hashed password
 * @param password {String} Plain text password
 * @param hash {String} Hashed password
 * @constructor
 * @return {Promise<boolean>} Weather the password matches or not
 */
export function Compare(password: string, hash: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        // noinspection JSIgnoredPromiseFromCall
        bcrypt.compare(password, hash, (err, same) => {
            if (err) return reject(err);
            return resolve(same);
        });
    });
}
