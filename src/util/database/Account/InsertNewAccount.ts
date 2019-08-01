/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Constants } from '../Constants';
import { pool } from '../pool';

/**
 * Insert new APIAccount data into Database
 * @param email {String} Email of user
 * @param password {String} Hashed password of user
 * @param roles {Array<String>} Roles the user has
 * @constructor
 * @return {Promise<APIAccount>} Created APIAccount
 */
export function InsertNewAccount(email: string, password: string, roles: string[] = []): Promise<APIAccount> {
    return new Promise<APIAccount>((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            connection.query(Constants.Create, [email, password, JSON.stringify(roles)], (err1, results) => {
                connection.release();
                if (err1) return reject(err1);
                return resolve({
                    ID: results.insertId as number,
                    email,
                    password,
                    roles,
                });
            });
        });
    });
}
