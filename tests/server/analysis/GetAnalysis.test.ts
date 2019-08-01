/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Connection } from 'mysql';
import * as httpMock from 'node-mocks-http';
import { NotFoundError } from 'routing-controllers';
import { GetData } from '../../../src/server/controllers/analysis/getData/GetData';
import { databaseSetup } from '../../../src/util/dev-test/databaseSetup';
import { databaseUndo } from '../../../src/util/dev-test/databaseUndo';
import { GenerateToken } from '../../../src/util/JWT';
import * as account from '../../setup/account';
import * as analysis from '../../setup/analysis';

describe('GET /analysis/ data', () => {
    let connection: Connection;
    let userID: number;
    let analysisData: any;
    let token: string;
    const session = 'a978zdzha8oidnbhaipohd';

    beforeAll(async () => {
        connection = await databaseSetup();
        userID = await account(connection, ['USER']);
        analysisData = await analysis(connection, 'h9a7dhg', userID);
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

    test('Unauthorized Request [No token]', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/analysis' + analysisData.ID,
            params: {
                id: analysisData.ID,
            },
        });

        return expect(GetData(request, analysisData.ID)).rejects.toBeInstanceOf(NotFoundError);
    });

    test('Unauthorized Request [Wrong token]', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/analysis' + analysisData.ID,
            headers: {
                authorization: 'whatever-this-is-wrong',
            },
            params: {
                id: analysisData.ID,
            },
        });

        return expect(GetData(request, analysisData.ID)).rejects.toBeInstanceOf(NotFoundError);
    });

    test('Wrong Unauthorized Request [Wrong ID]', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/analysis/this-is-invalid',
            params: {
                id: analysisData.ID,
            },
        });

        return expect(GetData(request, 'this-is-invalid')).rejects.toBeInstanceOf(NotFoundError);
    });

    test('Wrong Authorized Request [Wrong ID]', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/analysis/this-is-invalid',
            headers: {
                authorization: token,
            },
            params: {
                id: analysisData.ID,
            },
        });

        return expect(GetData(request, 'this-is-invalid')).rejects.toBeInstanceOf(NotFoundError);
    });

    test('GET Analysis Data', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/analysis' + analysisData.ID,
            headers: {
                authorization: token,
            },
            params: {
                id: analysisData.ID,
            },
        });

        return expect(GetData(request, analysisData.ID)).resolves.toEqual(analysisData.data);
    });
});
