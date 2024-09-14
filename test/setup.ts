/* eslint-disable prettier/prettier */
import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
    try {
        await rm(join(__dirname, '..', 'test_db.sqlite'))
    } catch (error) {
        throw new Error('test.sqlite file not found!');
    }
});