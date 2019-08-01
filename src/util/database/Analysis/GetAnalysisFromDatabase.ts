/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Constants } from '../Constants';
import { pool } from '../pool';

/**
 * Get Analysis data from Database which is either owned by the user or public
 * @param id {String} Analysis ID
 * @param owner {Number} User ID
 * @constructor
 * @return {Promise<DatabaseReturnAnalysis>} Analysis by ID
 */
export function GetAnalysisFromDatabase(id: string, owner: number): Promise<DatabaseReturnAnalysis> {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            connection.query(Constants.GetAnalysis, [id, owner], (err1, results) => {
                connection.release();
                if (err1) return reject(err1);
                if (results.length === 0) return reject(null);
                return resolve(results[0]);
            });
        });
    });
}
