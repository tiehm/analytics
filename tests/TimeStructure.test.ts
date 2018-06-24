import {readFileSync} from 'fs';
import {TimeStructure}  from '../src/util/TimeStructure';
import * as moment from 'moment';

describe('Time structure', () => {

    let content: string;
    let structure;

    beforeAll(() => {
        content = readFileSync(__dirname + '/example.txt', {encoding: 'utf-8'});
        structure = TimeStructure(content);
    });

    test('first message date time', () => {
        expect(structure.firstMessage).toBe('25.10.16, 19:23');
    });

    test('last message date time', () => {
        expect(structure.lastMessage).toBe('20.12.17, 00:05');
    });

    test('timestamp array', () => {
        expect(structure.timeValues.length).toBe(moment().diff(moment('25.10.16 19:23', 'DD.MM.YY HH:ss'), 'days'))
    })

});
