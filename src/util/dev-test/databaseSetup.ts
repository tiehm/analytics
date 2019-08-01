/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { readFileSync } from 'fs';
import { Connection, createConnection } from 'mysql';

export function databaseSetup(): Promise<Connection> {
    return new Promise<Connection>((resolve, reject) => {
        const sql = readFileSync(process.cwd() + '/sql/setup.sql', { encoding: 'utf8' });
        const connection: Connection = createConnection({
            user: 'test',
            password: 'test',
            host: 'localhost',
            charset: 'utf8mb4',
            multipleStatements: true,
        });
        connection.query(sql, err => {
            if (err) return reject(err);
            else return resolve(connection);
        });
    });
}
