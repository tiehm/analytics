/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as dotenv from 'dotenv';

dotenv.config();

if (process.env.NODE_ENV === 'test') {
    process.env.SESSION_TOKEN = 'a978zdzha8oidnbhaipohd';
}

/**
 * Export the process environment read from the .env file
 */
export const env = process.env;
