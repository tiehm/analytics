/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Connection } from 'mysql';
import * as httpMock from 'node-mocks-http';
import { BadRequestError } from 'routing-controllers';
import { SignUpController } from '../../../src/server/controllers/account/create/SignUpController';
import { databaseSetup } from '../../../src/util/dev-test/databaseSetup';
import { databaseUndo } from '../../../src/util/dev-test/databaseUndo';
import { GenerateToken } from '../../../src/util/JWT';
import * as account from '../../setup/account';

describe('POST /account/create', () => {
    let connection: Connection;
    let userID: number;
    // eslint-disable-next-line no-unused-vars
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

    test('Email already used', () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/accounts/create',
            body: {
                email: 'test@test.com',
                password: 'testing',
            },
        });

        return expect(
            SignUpController(request, {
                email: 'test@test.com',
                password: 'testing',
            }),
        ).rejects.toHaveProperty('message', 'This is email is already bound to an account.');
    });

    test('Valid Request', () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/accounts/create',
            body: {
                email: 'test2@test.com',
                password: 'testing',
            },
        });

        return expect(
            SignUpController(request, {
                email: 'test2@test.com',
                password: 'testing',
            }),
        ).resolves.toHaveProperty('fresh', true);
    });

    test('Bad Request', () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/accounts/create',
        });

        return expect(SignUpController(request, null)).rejects.toBeInstanceOf(BadRequestError);
    });

    test('Partial Bad Request', () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/accounts/create',
            body: {
                email: 'test@test.com',
            },
        });

        // @ts-ignore
        return expect(SignUpController(request, { email: 'test@test.com' })).rejects.toBeInstanceOf(BadRequestError);
    });
});
