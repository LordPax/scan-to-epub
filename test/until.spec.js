const assert = require('assert');
const until = require('../src/include/until')
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

    // describe('#requestPost()', () => {
    //     it.skip('should be not found', async () => {
    //         const res = await until.requestPost('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/03.jpg')
    //         assert.equal(res.statusCode, 404)
    //     })
    //     it.skip('should be found', async () => {
    //         const res = await until.requestPost('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/03.png')
    //         assert.equal(res.statusCode, 200)
    //     })
    // })

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