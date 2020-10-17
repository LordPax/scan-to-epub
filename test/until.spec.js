const assert = require('assert');
const until = require('../src/include/until')
const dScan = require('../src/download_scan')
const fs = require('fs')

until.verbose(false)

describe('until', () => {
    describe('#requestGet()', () => {
        it('should be not found', async () => {
            const res = await until.requestGet('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/03.jpg')
            assert.equal(res.statusCode, 404)
        })

        it('should be found', async () => {
            const res = await until.requestGet('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/03.png')
            assert.equal(res.statusCode, 200)
        })
    })

    /*describe('#convertWebpToPng()', () => {
        const dest = 'testFile/'
        const nameWebp = '01.webp'
        const namePng = '01.png'

        beforeEach(async () => {
            fs.mkdirSync(dest)
            await dScan.downloadPage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-968/01.webp', dest + nameWebp)
        })
        afterEach(() => fs.rmdirSync(dest, {recursive : true}))

        it('should convert webp to png', () => {
            const pngFile = until.convertWebpToPng(dest, nameWebp)

            assert.equal(fs.existsSync(dest + namePng), true)
            assert.equal(pngFile, namePng)
        })

        it('should not convert webp to png', () => {
            const pngFile = until.convertWebpToPng(dest, 'azeaze')

            assert.equal(fs.existsSync(dest + namePng), false)
            assert.equal(pngFile, '')
        })
    })*/

    describe('#found()', () => {
        it('should be not found', async () => {
            const res = await until.found('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/03.jpg')
            const res2 = await until.found('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/04.jpg')

            assert.equal(res, false)
            assert.equal(res2, false)
        })

        it('should be found', async () => {
            const res = await until.found('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/03.png')
            const res2 = await until.found('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/04.png')
            
            assert.equal(res, true)
            assert.equal(res2, true)
        })
    })
})