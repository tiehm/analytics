/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { IsEmail, MaxLength, MinLength } from 'class-validator';

/**
 * Validate Signup body
 */
export class SignUpForm {
    @IsEmail()
    public email: string;

    @MinLength(6, {
        message: 'The password is too short.',
    })
    @MaxLength(50, {
        message: 'The password is too long.',
    })
    public password: string;
}
