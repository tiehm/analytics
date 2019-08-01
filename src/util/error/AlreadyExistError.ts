/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { HttpError } from 'routing-controllers';

export class AlreadyExistError extends HttpError {
    public name: string;
    public constructor() {
        super(409, 'This is email is already bound to an account.');
    }
}
