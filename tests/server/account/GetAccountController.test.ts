/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Connection } from 'mysql';
import * as httpMock from 'node-mocks-http';
import { BadRequestError, NotFoundError, UnauthorizedError } from 'routing-controllers';
import { GetAccountController } from '../../../src/server/controllers/account/get/GetAccountController';
import { databaseSetup } from '../../../src/util/dev-test/databaseSetup';
import { databaseUndo } from '../../../src/util/dev-test/databaseUndo';
import { GenerateToken } from '../../../src/util/JWT';
import * as account from '../../setup/account';

describe('GET /account/:id', () => {
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

    test('Valid account', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/accounts/' + userID,
            headers: {
                authorization: token2,
            },
            params: {
                id: userID,
            },
        });

        return expect(GetAccountController(request, userID)).resolves.toHaveProperty('email', 'test@test.com');
    });

    test('Valid account, wrong authentication', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/accounts/' + userID,
            headers: {
                authorization: token,
            },
            params: {
                id: userID,
            },
        });

        return expect(GetAccountController(request, userID)).rejects.toBeInstanceOf(UnauthorizedError);
    });

    test('Bad Request', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/accounts/' + userID,
            headers: {
                authorization: token,
            },
            params: {
                id: userID,
            },
        });

        return expect(GetAccountController(request, null)).rejects.toBeInstanceOf(BadRequestError);
    });

    test('Bad Request, wrong ID', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/accounts/89371',
            headers: {
                authorization: token2,
            },
            params: {
                id: 89371,
            },
        });

        return expect(GetAccountController(request, 89371)).rejects.toBeInstanceOf(NotFoundError);
    });
});
