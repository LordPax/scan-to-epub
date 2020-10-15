const assert = require('assert');
const lib = require('../src/include/lib-perso')
const until = require('../src/include/until')
until.verbose(false)

describe('lib-perso', () => {
    describe('#match()', () => {
        it('should be equal to "test 4"', () => {
            const val = lib.match(6)
            .case(1, () => 'test 1')
            .plage(2, 4, () => 'test 2')
            .case(5, () => 'test 3')
            .case(6, () => 'test 4')
            .default(() => 'default')

            assert.equal(val, 'test 4')
        })
        it('should be equal to "test 2"', () => {
            const val = lib.match(3)
            .case(1, () => 'test 1')
            .plage(2, 4, () => 'test 2')
            .case(5, () => 'test 3')
            .case(6, () => 'test 4')
            .default(() => 'default')

            assert.equal(val, 'test 2')
        })
        it('should be equal to "default"', () => {
            const val = lib.match(15)
            .case(1, () => 'test 1')
            .plage(2, 4, () => 'test 2')
            .case(5, () => 'test 3')
            .case(6, () => 'test 4')
            .default(() => 'default')

            assert.equal(val, 'default')
        })
    })
    describe('#in_array()', () => {
        const tab = ['test1', 'test2', 'test3', 'test4', 'test5', 'test4']
        it('should return false', () => {
            const val = lib.in_array('test6', tab)
            assert.equal(val, false)
        })
        it('should return 1', () => {
            const val = lib.in_array('test2', tab)
            assert.equal(val, 1)
        })
        it('should return 2', () => {
            const val = lib.in_array('test4', tab)
            assert.equal(val, 2)
        })
    })
})