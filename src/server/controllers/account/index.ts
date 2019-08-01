/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as express from 'express';
import { Authorized, Body, Get, JsonController, Param, Post, Req } from 'routing-controllers';
import { SignUpController } from './create/SignUpController';
import { SignUpForm } from './create/SignUpForm';
import { GetAccountController } from './get/GetAccountController';
import { LoginController } from './login/LoginController';
import { LoginForm } from './login/LoginForm';
import { VerifyController } from './verify/VerifyController';

@JsonController('/account')
export class Account {
    @Post('/login')
    public login(
        @Req() req: express.Request,
        @Body({ required: true })
        form: LoginForm,
    ) {
        return LoginController(req, form);
    }

    @Post('/create')
    public create(
        @Req() req: express.Request,
        @Body({ required: true })
        form: SignUpForm,
    ) {
        return SignUpController(req, form);
    }

    @Get('/verify')
    public verify(@Req() req: express.Request) {
        return VerifyController(req);
    }

    @Get('/:id')
    @Authorized(['ADMIN'])
    public get(@Req() req: express.Request, @Param('id') id: number) {
        return GetAccountController(req, id);
    }
}
