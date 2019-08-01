/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Constants } from '../Constants';
import { pool } from '../pool';

/**
 * Get APIAccount Data from User
 * @param email {String} Email of the APIAccount to search for
 * @constructor
 * @return {Promise<IAccount>} APIAccount Data
 */
export function GetAccountFromDatabaseByEmail(email: string): Promise<APIAccount> {
    return new Promise<APIAccount>((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            connection.query(Constants.Login, [email], (err1, results: APIAccount[]) => {
                connection.release();
                if (err1) return reject(err1);
                if (results.length === 0) return resolve(null);
                if (results.length > 1) return resolve(null);
                return resolve(results[0]);
            });
        });
    });
}
