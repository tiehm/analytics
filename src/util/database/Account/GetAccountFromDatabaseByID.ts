/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { pool } from '../pool';

/**
 * Get APIAccount Data from User
 * @param id {Number} ID of the APIAccount to search for
 * @constructor
 * @return {Promise<Account>} APIAccount Data
 */
export function GetAccountFromDatabaseByID(id: number): Promise<APIAccount> {
    return new Promise<APIAccount>((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            connection.query('SELECT * FROM accounts WHERE ID = ?;', [id], (err1, results) => {
                connection.release();
                if (err1) return reject(err1);
                if (results.length === 0) return resolve(null);
                if (results.length > 1) return resolve(null);
                return resolve({
                    email: results[0].email,
                    password: results[0].password,
                    roles: JSON.parse(results[0].roles),
                    ID: results[0].ID,
                });
            });
        });
    });
}
