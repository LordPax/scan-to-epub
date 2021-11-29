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
})
