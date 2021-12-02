#!/usr/bin/node

const ste = require('./src/scan_to_epub')
const fs = require('fs')
const {verbose, foundChap} = require('./src/include/utils')
require('dotenv').config()

if (process.argv.length < 3) {
    console.log('aucun paramètre indiquer')
    return
}

const {argv} = process

const help = `
usage : scan2epub.js <option>

-h --help ............... affiche ceci
-s --no-verbose ......... mode silencieux
-dc <chap> <chap> ....... télécharge et convertie les chapitres demandé
-d <chap> <chap> ........ télécharge les chapitres demandé
-c <chap> <chap> ........ convertie en epub les chapitres demandé
-i <chap> <interval> .... convertie le chapitre suivant a l'intervale demander en seconde (soon)
--exist <chap> .......... détermine si le chapitre existe
`

if (argv.indexOf('-h') !== -1 || argv.indexOf('--help') !== -1) {
    console.log(help)
    return
}

if (argv.indexOf('--exist') !== -1) {
    (async () => {
        const i = argv.indexOf('--exist')
        const chap = parseInt(argv[i + 1])
        if (await foundChap(process.env.URL, chap))
            console.log('chapter ' + chap + ' exist')
        else
            console.log('chapter ' + chap + ' doesn\'t exist')
    })()
}

if (argv.indexOf('--no-verbose') !== -1 || argv.indexOf('-s') !== -1) verbose(false)

if (argv.indexOf('-dc') !== -1) {
    (async () => {
        // TODO : améliorer la vérification des input
        const i = argv.indexOf('-dc')
        const chap = parseInt(argv[i + 1])
        const chap2 = argv[i + 2] ? parseInt(argv[i + 2]) : 0
        const nbChap = (chap2 - chap) + 1

        if (typeof chap === 'number' && typeof nbChap === 'number') {
            await ste.moreChapDownload(process.env.URL, process.env.DEST, chap, nbChap)
            ste.moreChapEpub(process.env.DEST, process.env.EPUB, chap, nbChap)
        }
    })()
    return
}

if (argv.indexOf('-d') !== -1) {
    const i = argv.indexOf('-d')
    const chap = parseInt(argv[i + 1])
    const chap2 = argv[i + 2] ? parseInt(argv[i + 2]) : 0
    const nbChap = (chap2 - chap) + 1

    if (typeof chap === 'number' && typeof nbChap === 'number')
        ste.moreChapDownload(process.env.URL, process.env.DEST, chap, nbChap)
    return
}

if (argv.indexOf('-c') !== -1) {
    const i = argv.indexOf('-c')
    const chap = parseInt(argv[i + 1])
    const chap2 = argv[i + 2] ? parseInt(argv[i + 2]) : 0
    const nbChap = (chap2 - chap) + 1

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
