const assert = require('assert');
const dScan = require('../src/download_scan');
const fs = require('fs');
const utils = require('../src/include/utils');
require('dotenv').config();

utils.verbose(false);

describe('download_scan', () => {
    describe('#downloadPage()', () => {
        const dest = 'testFile/';
        const name = 'test.png';
        const name2 = 'test2.png';

        beforeEach(() => fs.mkdirSync(dest));
        afterEach(() => fs.rmSync(dest, { recursive: true }));

        it('should download file', async () => {
            await dScan.downloadPage(
                process.env.URL + '967/03.png',
                dest + name,
            );
            await dScan.downloadPage(
                process.env.URL + '967/04.png',
                dest + name2,
            );

            assert.equal(fs.existsSync(dest + name), true);
            assert.equal(fs.existsSync(dest + name2), true);
        }).timeout(10000);

        it('should not download file', async () => {
            await dScan.downloadPage(
                process.env.URL + '967/03.jpg',
                dest + name,
            );
            await dScan.downloadPage(
                process.env.URL + '967/03.webp',
                dest + name2,
            );

            assert.equal(fs.existsSync(dest + name), false);
            assert.equal(fs.existsSync(dest + name2), false);
        }).timeout(10000);
    });
});
