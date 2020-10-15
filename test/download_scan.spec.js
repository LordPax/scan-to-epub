const assert = require('assert');
const dScan = require('../src/download_scan')
const fs = require('fs')
const until = require('../src/include/until')

until.verbose(false)

describe('download_scan', () => {
    describe('#modifExt()', () => {
        it('should change extention', () => {
            const {newUrl, newDest} = dScan.modifExt('file1.txt', 'file2.txt', 'txt', 'merde')

            assert.equal(newUrl, 'file1.merde')
            assert.equal(newDest, 'file2.merde')
        })
    })
    describe('#modifUrl()', () => {
        it('should change extention png to jpg', () => {
            const {newUrl, newDest} = dScan.modifUrl('file1.png', 'file2.png')

            assert.equal(newUrl, 'file1.jpg')
            assert.equal(newDest, 'file2.jpg')
        })
        it('should change extention jpg to jpeg', () => {
            const {newUrl, newDest} = dScan.modifUrl('file1.jpg', 'file2.jpg')

            assert.equal(newUrl, 'file1.jpeg')
            assert.equal(newDest, 'file2.jpeg')
        })
        it('should change extention jpeg to webp', () => {
            const {newUrl, newDest} = dScan.modifUrl('file1.jpeg', 'file2.jpeg')

            assert.equal(newUrl, 'file1.webp')
            assert.equal(newDest, 'file2.webp')
        })
        it.skip('should do nothing if its webp', () => {
            const {newUrl, newDest} = dScan.modifUrl('file1.webp', 'file2.webp')

            assert.equal(newUrl, 'file1.webp')
            assert.equal(newDest, 'file2.webp')
        })
    })
    describe('#downloadPage()', () => {
        const dest = 'testFile/'
        const name = 'test.png'
        const name2 = 'test2.png'

        beforeEach(() => fs.mkdirSync(dest))
        afterEach(() => fs.rmdirSync(dest, {recursive : true}))

        it('should download file', async () => {
            await dScan.downloadPage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/03.png', dest + name)
            await dScan.downloadPage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/04.png', dest + name2)
            
            assert.equal(fs.existsSync(dest + name), true)
            assert.equal(fs.existsSync(dest + name2), true)
        })
        it('should not download file', async () => {
            await dScan.downloadPage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/03.jpg', dest + name)
            await dScan.downloadPage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/03.webp', dest + name2)
            
            assert.equal(fs.existsSync(dest + name), false)
            assert.equal(fs.existsSync(dest + name2), false)
        })
    })
})