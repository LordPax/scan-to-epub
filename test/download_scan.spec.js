const assert = require('assert');
const dScan = require('../src/download_scan')
const fs = require('fs')
const utils = require('../src/include/utils')
require('dotenv').config()

utils.verbose(false)

describe('download_scan', () => {
    describe('#downloadPage()', () => {
        const dest = 'testFile/'
        const name = 'test.png'
        const name2 = 'test2.png'

        beforeEach(() => fs.mkdirSync(dest))
        afterEach(() => fs.rmSync(dest, {recursive : true}))

        it('should download file', async () => {
            await dScan.downloadPage(process.env.URL + '967/03.png', dest + name)
            await dScan.downloadPage(process.env.URL + '967/04.png', dest + name2)
            
            assert.equal(fs.existsSync(dest + name), true)
            assert.equal(fs.existsSync(dest + name2), true)
        })

        it('should not download file', async () => {
            await dScan.downloadPage(process.env.URL + '967/03.jpg', dest + name)
            await dScan.downloadPage(process.env.URL + '967/03.webp', dest + name2)
            
            assert.equal(fs.existsSync(dest + name), false)
            assert.equal(fs.existsSync(dest + name2), false)
        })
    })
    describe('#getListOfPage', () => {
        const url = process.env.URL + '1000/'
        const dest = 'files/chap-1000/'
        const expectedList = [
            { url: url + '01.jpg', dest: dest + '01.jpg' },
            { url: url + '02.jpg', dest: dest + '02.jpg' },
            { url: url + '03.jpg', dest: dest + '03.jpg' },
            { url: url + '04.jpg', dest: dest + '04.jpg' },
            { url: url + '05.jpg', dest: dest + '05.jpg' },
            { url: url + '06.jpg', dest: dest + '06.jpg' },
            { url: url + '07.jpg', dest: dest + '07.jpg' },
            { url: url + '08.jpg', dest: dest + '08.jpg' },
            { url: url + '09.jpg', dest: dest + '09.jpg' },
            { url: url + '10.jpg', dest: dest + '10.jpg' },
            { url: url + '11.jpg', dest: dest + '11.jpg' },
            { url: url + '12.jpg', dest: dest + '12.jpg' },
            { url: url + '13.jpg', dest: dest + '13.jpg' },
            { url: url + '14.jpg', dest: dest + '14.jpg' },
            { url: url + '15.jpg', dest: dest + '15.jpg' }
        ]

        it('should found', async () => {
            const list = await dScan.getListOfPage(url, dest)

            assert.equal(list.length, 15)
            assert.deepEqual(list, expectedList)
        }).timeout(25000)
    })
})
