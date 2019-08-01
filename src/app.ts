/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import 'reflect-metadata';
import { Action, useExpressServer } from 'routing-controllers';

import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { DecodeToken } from './util/JWT';

dotenv.config();

const app: express.Application = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

useExpressServer(app, {
    authorizationChecker: async (action: Action, roles?: string[]) => {
        const token: string = (action.request as express.Request).headers.authorization as string;
        const user = DecodeToken(token, process.env.SESSION_TOKEN);

        if (user && !roles.length) return true;
        return !!(user && roles.length && roles.find(role => user.roles.indexOf(role) !== -1));
    },
    controllers: [__dirname + '/server/controllers/*.js', __dirname + '/server/controllers/**/*.js'],
    cors: true,
    middlewares: [__dirname + '/server/middlewares/**/*.js', __dirname + '/server/middlewares/*.js'],
    routePrefix: '/api',

    defaultErrorHandler: false,
    // development: false,
});

export { app };

app.listen(process.env.PORT || 3000);
