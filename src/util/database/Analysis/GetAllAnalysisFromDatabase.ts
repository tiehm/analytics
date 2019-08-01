/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Constants } from '../Constants';
import { pool } from '../pool';

/**
 * Get all Analysis from Database which are owned by the user
 * @param owner {Number} User ID
 * @constructor
 * @return {Promise<Array<Analysis>>} Analysis owned by user
 */
export function GetAllAnalysisFromDatabase(owner: number): Promise<Analysis[]> {
    return new Promise<Analysis[]>((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            connection.query(Constants.GetAllAnalysis, [owner], (err1, results: Analysis[]) => {
                connection.release();
                if (err1) return reject(err1);
                if (results.length === 0) return reject(null);
                return resolve(results);
            });
        });
    });
}
