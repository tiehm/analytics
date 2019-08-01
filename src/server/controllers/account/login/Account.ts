/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

// eslint-disable-next-line max-len
import { GetAccountFromDatabaseByEmail } from '../../../../util/database/Account/GetAccountFromDatabaseByEmail';
import { Compare } from '../../../../util/password/Compare';

/**
 * Get APIAccount and verify password
 * @param email {String} User Email
 * @param password {String} User Plain password
 * @constructor
 * @return {Promise<IAccount>} APIAccount data
 */
export function GetAccount(email: string, password: string): Promise<APIAccount> {
    return new Promise<APIAccount>(async (resolve, reject) => {
        try {
            const Account: APIAccount = await GetAccountFromDatabaseByEmail(email);
            if (!Account) return reject(null);
            if (await Compare(password, Account.password)) return resolve(Account);
            else return reject(null);
        } catch (e) {
            reject(e || null);
        }
    });
}
