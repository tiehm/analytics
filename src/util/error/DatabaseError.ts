/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { MysqlError } from 'mysql';
import { HttpError } from 'routing-controllers';

export class DatabaseError extends HttpError {
    public name: string;
    public operationName: string;
    public args: MysqlError;

    public constructor(operationName: string, args: MysqlError) {
        super(500, 'An unknown database error occurred.');
        Object.setPrototypeOf(this, DatabaseError.prototype);
        this.operationName = operationName;
        this.args = args;
    }
}
