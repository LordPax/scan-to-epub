const assert = require('assert');
const cScan = require('../src/convert_to_epub')
const dScan = require('../src/download_scan')
const fs = require('fs')
const utils = require('../src/include/utils')
require('dotenv').config()

utils.verbose(false)

describe('convert_to_epub', () => {
    describe('#chapToEpub()', () => {
        const chap = 968
        const dest = 'testFile/chap-' + chap + '/'
        const out = 'testFile/'
        const nameWebp = '01.webp'
        const namePng = '01.png'

        beforeEach(async () => {
            fs.mkdirSync(out)
            fs.mkdirSync(dest)
            await dScan.downloadPage(process.env.URL + '968/01.png', dest + nameWebp)
        })
        afterEach(() => fs.rmSync(out, {recursive : true}))

        it.skip('should convert to epub (but it\'s webp images)', () => {
            cScan.chapToEpub(dest, out, chap)

            assert.equal(fs.existsSync(out + 'scan-' + chap), true)
        })

        it.skip('should convert to epub ', () => {
            cScan.chapToEpub(dest, dest, 968)

            assert.equal(fs.existsSync(dest + namePng), true)
        })

        it.skip('should not convert epub', () => {
            const pngFile = utils.convertWebpToPng(dest, 'azeaze')

            assert.equal(fs.existsSync(dest + namePng), false)
            assert.equal(pngFile, '')
        })
    })
})
