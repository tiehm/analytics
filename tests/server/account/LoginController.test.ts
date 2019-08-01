/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Connection } from 'mysql';
import * as httpMock from 'node-mocks-http';
import { BadRequestError, HttpError } from 'routing-controllers';
import { LoginController } from '../../../src/server/controllers/account/login/LoginController';
import { databaseSetup } from '../../../src/util/dev-test/databaseSetup';
import { databaseUndo } from '../../../src/util/dev-test/databaseUndo';
import { GenerateToken } from '../../../src/util/JWT';
import * as account from '../../setup/account';

describe('POST /account/login', () => {
    let connection: Connection;
    let userID: number;
    let token: string;
    const session = 'a978zdzha8oidnbhaipohd';

    beforeAll(async () => {
        connection = await databaseSetup();
        userID = await account(connection, ['USER']);
        token = GenerateToken(
            {
                ID: userID,
                roles: JSON.stringify(['USER']),
            },
            session,
        );
    });
    afterAll(async () => {
        await databaseUndo(connection);
    });

    test('Fresh Login', () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/accounts/login',
            body: {
                email: 'test@test.com',
                password: 'testing',
            },
        });

        return expect(
            LoginController(request, {
                email: 'test@test.com',
                password: 'testing',
            }),
        ).resolves.toHaveProperty('fresh', true);
    });

    test('Renew Login', () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/accounts/login',
            headers: {
                authorization: token,
            },
            body: {
                email: 'test@test.com',
                password: 'testing',
            },
        });

        return expect(
            LoginController(request, {
                email: 'test@test.com',
                password: 'testing',
            }),
        ).resolves.toHaveProperty('fresh', false);
    });

    test('Wrong credentials', () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/accounts/login',
            body: {
                email: 'test@test.com',
                password: 'super-wrong-pass',
            },
        });

        return expect(
            LoginController(request, {
                email: 'test@test.com',
                password: 'super-wrong-pass',
            }),
        ).rejects.toBeInstanceOf(HttpError);
    });

    test('Bad Request', () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/accounts/login',
        });

        return expect(LoginController(request, null)).rejects.toBeInstanceOf(BadRequestError);
    });

    test('Bad Request with token', () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/accounts/login',
            headers: {
                authorization: token,
            },
        });

        return expect(LoginController(request, null)).rejects.toBeInstanceOf(BadRequestError);
    });

    test('Bad Request wrong email', () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/accounts/login',
            body: {
                email: 'something@test.com',
                password: 'super-secure',
            },
        });

        return expect(
            LoginController(request, {
                email: 'something@test.com',
                password: 'super-secure',
            }),
        ).rejects.toBeInstanceOf(HttpError);
    });
});
