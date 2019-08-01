/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as bcrypt from 'bcrypt';

/**
 * Hashing password
 * @param password {String} Plain text password
 * @constructor
 * @return {Promise<String>} Hashed password
 */
export function Hash(password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        // noinspection JSIgnoredPromiseFromCall
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return reject(err);
            // noinspection JSIgnoredPromiseFromCall
            bcrypt.hash(password, salt, (err1, hash) => {
                if (err1) return reject(err1);
                return resolve(hash);
            });
        });
    });
}
