/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as fs from 'fs';
import { Connection } from 'mysql';
import * as httpMock from 'node-mocks-http';
import { join } from 'path';
import { BadRequestError, UnauthorizedError } from 'routing-controllers';
import { NewAnalysis } from '../../../src/server/controllers/analysis/new/NewAnalysis';
import { GetAnalysisFromDatabase } from '../../../src/util/database/Analysis/GetAnalysisFromDatabase';
import { databaseSetup } from '../../../src/util/dev-test/databaseSetup';
import { databaseUndo } from '../../../src/util/dev-test/databaseUndo';
import { GenerateToken } from '../../../src/util/JWT';
import * as account from '../../setup/account';

describe('POST /analysis/new', () => {
    let connection: Connection;
    let userID: number;
    let token: string;
    const session = 'a978zdzha8oidnbhaipohd';

    beforeAll(async () => {
        connection = await databaseSetup();
        userID = await account(connection, ['USER']);
        token = GenerateToken({ ID: userID, roles: JSON.stringify(['USER']) }, session);
    });
    afterAll(async () => {
        await databaseUndo(connection);
    });

    test('Insert new Analysis with file', async () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/analysis/new',
            headers: {
                'content-type': 'multipart/form-data;',
                authorization: token,
            },
            body: {
                file: {
                    value: fs.createReadStream(join(__dirname, '../', '../', 'structures/', 'chat/', 'example.txt')),
                    options: { filename: 'yo', contentType: null },
                },
                name: 'Charlie',
                name2: 'Peter',
                public: false,
            },
        });

        fs.writeFileSync(
            `${process.cwd()}\\chats\\1534082015598-chat.txt`,
            fs.readFileSync(`${process.cwd()}\\tests\\example.txt`),
        );

        const { id } = await NewAnalysis(
            request,
            {
                fieldname: 'file',
                originalname: 'example.txt',
                encoding: '7bit',
                mimetype: 'text/plain',
                destination: `${process.cwd()}\\chats\\1534082015598-chat.txt`,
                filename: '1534082015598-chat.txt',
                path:
                    // tslint:disable-next-line:max-line-length
                    `${process.cwd()}\\chats\\1534082015598-chat.txt`,
                size: 6963,
            },
            {
                name: 'Charlie',
                name2: 'Peter',
                public: false,
            },
        );

        const data = GetAnalysisFromDatabase(id, userID);

        return expect(data).resolves.toHaveProperty('ID', id);
    });

    test('Insert new Analysis without content', () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/analysis/new',
            headers: {
                'content-type': 'multipart/form-data;',
                authorization: token,
            },
            body: {
                name: 'Charlie',
                name2: 'Peter',
                public: false,
            },
        });

        return expect(
            NewAnalysis(request, null, {
                name: 'Charlie',
                name2: 'Peter',
                public: false,
            }),
        ).rejects.toBeInstanceOf(BadRequestError);
    });

    test('Unauthorized new analysis', () => {
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/api/analysis/new',
            headers: {
                'content-type': 'multipart/form-data;',
            },
            body: {
                chat: 'dahdioahdoiahd',
                name: 'Charlie',
                name2: 'Peter',
                public: false,
            },
        });

        return expect(
            NewAnalysis(request, null, {
                name: 'Charlie',
                name2: 'Peter',
                public: false,
                chat: 'dahdioahdoiahd',
            }),
        ).rejects.toBeInstanceOf(UnauthorizedError);
    });
});
