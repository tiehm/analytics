/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as dotenv from 'dotenv';
import { createPool, Pool } from 'mysql';

dotenv.config();

/**
 * Create connection pool and export it
 */
export const pool: Pool = createPool({
    charset: 'utf8mb4',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
});
