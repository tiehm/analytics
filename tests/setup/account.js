/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

/*eslint @typescript-eslint/no-var-requires:0*/
const { Constants } = require('../../src/util/database/Constants');
const { Hash } = require('../../src/util/password/Hash');

module.exports = function(connection, roles, email = 'test@test.com') {
    return new Promise(async (resolve, reject) => {
        connection.query(Constants.Create, [email, await Hash('testing'), JSON.stringify(roles)], (err, results) => {
            if (err) return reject(err);
            return resolve(results.insertId);
        });
    });
};
