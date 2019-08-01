/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Connection } from 'mysql';
import * as httpMock from 'node-mocks-http';
import { VerifyController } from '../../../src/server/controllers/account/verify/VerifyController';
import { databaseSetup } from '../../../src/util/dev-test/databaseSetup';
import { databaseUndo } from '../../../src/util/dev-test/databaseUndo';
import { GenerateToken } from '../../../src/util/JWT';
import * as account from '../../setup/account';

describe('GET /account/verify', () => {
    let connection: Connection;
    let userID: number;
    let userID2: number;
    let token: string;
    let token2: string;
    const session = 'a978zdzha8oidnbhaipohd';

    beforeAll(async () => {
        connection = await databaseSetup();
        userID = await account(connection, ['USER']);
        userID2 = await account(connection, ['USER', 'ADMIN'], 'test2@test.com');

        token = GenerateToken(
            {
                ID: userID,
                roles: JSON.stringify(['USER']),
            },
            session,
        );
        token2 = GenerateToken(
            {
                ID: userID2,
                roles: JSON.stringify(['USER', 'ADMIN']),
            },
            session,
        );
    });
    afterAll(async () => {
        await databaseUndo(connection);
    });

    test('Verify User', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/accounts/verify',
            headers: {
                authorization: token,
            },
        });

        return expect(VerifyController(request)).resolves.toEqual({
            success: true,
            id: userID,
            roles: ['USER'],
        });
    });

    test('Verify Admin', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/accounts/verify',
            headers: {
                authorization: token2,
            },
        });

        return expect(VerifyController(request)).resolves.toEqual({
            success: true,
            id: userID2,
            roles: ['USER', 'ADMIN'],
        });
    });

    test('Verify error', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/accounts/verify',
        });

        return expect(VerifyController(request)).resolves.toEqual({
            success: false,
        });
    });

    test('Verify error, wrong token', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/accounts/verify',
            headers: {
                authorization: 'random',
            },
        });

        return expect(VerifyController(request)).resolves.toEqual({
            success: false,
        });
    });
});
