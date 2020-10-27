#!/usr/bin/node

const ste = require('./src/scan_to_epub')
const fs = require('fs')
const {verbose} = require('./src/include/until')
require('dotenv').config()

if (process.argv.length < 3) {
    console.log('aucun paramètre indiquer')
    return
}

const {argv} = process

const help = `
usage : app.js <option>

-h --help ................ affiche ceci
--no-verbose ............. mode silencieux
-d <chap> <nbChap> ....... télécharge du chapitre demander jusqu'au nombre indiquer
-c <chap> <nbChap> ....... convertie en epub du chapitre demander jusqu'au nombre indiquer
-i <chap> <interval> ..... convertie le chapitre suivant a l'intervale demander en seconde 
`

if (argv.indexOf('-h') !== -1 || argv.indexOf('--help') !== -1) {
    console.log(help)
    return
}

if (argv.indexOf('--no-verbose') !== -1) verbose(false)

if (argv.indexOf('-d') !== -1) {
    const i = argv.indexOf('-d')
    const chap = parseInt(argv[i + 1])
    const nbChap = parseInt(argv[i + 2])

    if (typeof chap === 'number' && typeof nbChap === 'number')
        ste.moreChapDownload(process.env.URL, process.env.DEST, chap, nbChap)
    return
}

if (argv.indexOf('-c') !== -1) {
    const i = argv.indexOf('-c')
    const chap = parseInt(argv[i + 1])
    const nbChap = parseInt(argv[i + 2])

    if (typeof chap === 'number' && typeof nbChap === 'number')
        ste.moreChapEpub(process.env.DEST, process.env.EPUB, chap, nbChap)
    return
}

if (argv.indexOf('-i') !== -1) {
    const i = argv.indexOf('-i')
    const chap = parseInt(argv[i + 1])
    const interval = parseInt(argv[i + 2])

    ste.interChap(process.env.URL, chap, interval)
    // setInterval(ste.interChap, interval, process.env.URL, chap)
}