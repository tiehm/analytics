/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import { Connection } from 'mysql';
import * as httpMock from 'node-mocks-http';
import { UnauthorizedError } from 'routing-controllers';
import { GetHomepage } from '../../../src/server/controllers/analysis/getHomepage/GetHomepage';
import { databaseSetup } from '../../../src/util/dev-test/databaseSetup';
import { databaseUndo } from '../../../src/util/dev-test/databaseUndo';
import { GenerateToken } from '../../../src/util/JWT';
import * as account from '../../setup/account';
import * as analysis from '../../setup/analysis';

describe('GET /analysis/ homepage', () => {
    let connection: Connection;
    let userID: number;
    // eslint-disable-next-line no-unused-vars
    let analysisData: unknown;
    // eslint-disable-next-line no-unused-vars
    let analysisData2: unknown;
    let token: string;
    const session = 'a978zdzha8oidnbhaipohd';

    beforeAll(async () => {
        connection = await databaseSetup();
        userID = await account(connection, ['USER']);
        analysisData = await analysis(connection, 'h9a7dhg', userID);
        analysisData2 = await analysis(connection, '7ad7ad', userID);
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

    test('Unauthorized Request', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/analysis',
        });

        return expect(GetHomepage(request)).rejects.toBeInstanceOf(UnauthorizedError);
    });

    test('Authorized Request', () => {
        const request = httpMock.createRequest({
            method: 'GET',
            url: '/api/analysis',
            headers: {
                authorization: token,
            },
        });

        return expect(GetHomepage(request)).resolves.toHaveLength(2);
    });
});
