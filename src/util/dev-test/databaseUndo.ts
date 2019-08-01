/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Connection } from 'mysql';

export function databaseUndo(connection: Connection): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        connection.query('DROP DATABASE analytics;', err => {
            if (err) return reject(err);
            else return resolve(true);
        });
    });
}
