const sum = (i, n, callback, res = 0) => {
    const r = res + callback(i)
    return i < n ? sum(i + 1, n, callback, r) : r
}

const prod = (i, n, callback, res = 1) => {
    const r = res * callback(i)
    return i < n ? prod(i + 1, n, callback, r) : r
}

const sfor = (compt, f, acc = 0, r = null) => {
    const re = acc < compt ? f(acc, r) : r
    return acc < compt ? sfor(compt, f, acc + 1, re) : re
}

const p = (nb, pu = 2, acc = 0, res = 1) => {
    const r = res * n
    return acc < pu ? p(nb, pu, acc + 1, r) : res
}

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const str_rand = (taille, char = '') => {
    const char_rand = rand(0, 1) === 1 ? rand(65, 90) : rand(97, 122)
    const tmp = String.fromCharCode(char_rand)
    return taille > 0 ? str_rand(taille - 1, char + tmp) : char
}

const match = (test = null, acc = null) => ({
    case: (val, act) => match(test, val === test ? act() : acc),
    if: (cond, act) => match(test, cond ? act() : acc),
    plage: (val1, val2, act) => match(test, (test >= val1 && test <= val2) ? act() : acc),
    default: act => acc === null ? act() : acc
})

const in_array = (search, array) => {
    const find = array.filter(elem => elem === search)
    return find.length > 0 ? find.length : false
}

const escapeHtml = text => {
    const map = {
        '<': '&lt;',
        '>': '&gt;',
    }
    return text.replace(/[<>]/g, m => map[m])
}

module.exports = {
    sum,
    prod,
    p,
    sfor,
    rand,
    match,
    str_rand,
    escapeHtml,
    in_array
}