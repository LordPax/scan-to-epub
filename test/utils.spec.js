const assert = require('assert');
const utils = require('../src/include/utils')
const dScan = require('../src/download_scan')
const fs = require('fs')
require('dotenv').config()

utils.verbose(false)

describe('utils', () => {
    describe('#requestGet()', () => {
        it('should be not found', async () => {
            const res = await utils.requestGet(process.env.URL + '967/03.jpg')
            assert.equal(res.statusCode, 404)
        })

        it('should be found', async () => {
            const res = await utils.requestGet(process.env.URL + '967/03.png')
            assert.equal(res.statusCode, 200)
        })
    })

    describe('#convertWebpToPng()', () => {
        const dest = 'testFile/'
        const nameWebp = '01.webp'
        const namePng = '01.png'

        beforeEach(async () => {
            fs.mkdirSync(dest)
            await dScan.downloadPage(process.env.URL + '968/01.webp', dest + nameWebp)
        })
        afterEach(() => fs.rmSync(dest, {recursive : true}))

        it('should convert webp to png', () => {
            const pngFile = utils.convertWebpToPng(dest, nameWebp)

            assert.equal(fs.existsSync(dest + namePng), true)
            assert.equal(pngFile, namePng)
        })

        it('should not convert webp to png', () => {
            const pngFile = utils.convertWebpToPng(dest, 'azeaze')

            assert.equal(fs.existsSync(dest + namePng), false)
            assert.equal(pngFile, '')
        })
    })

    describe('#found()', () => {
        it('should be not found', async () => {
            const res = await utils.found(process.env.URL + '967/03.jpg')
            const res2 = await utils.found(process.env.URL + '967/04.jpg')

            assert.equal(res, false)
            assert.equal(res2, false)
        })

        it('should be found', async () => {
            const res = await utils.found(process.env.URL + '967/03.png')
            const res2 = await utils.found(process.env.URL + '967/04.png')
            
            assert.equal(res, true)
            assert.equal(res2, true)
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
            const list = await utils.getListOfPage(url, dest)

            assert.equal(list.length, 15)
            assert.deepEqual(list, expectedList)
        }).timeout(25000)
    })
})
