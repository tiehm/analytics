/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { IsEmail, MinLength } from 'class-validator';

export class LoginForm {
    @IsEmail()
    public email: string;

    @MinLength(6)
    public password: string;
}
