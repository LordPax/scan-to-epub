const ste = require('./src/scan_to_epub')
const dScan = require('./src/download_scan')
const fs = require('fs')
const verbose = require('./src/include/verbose')

// ste.moreChapDownload('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/', 'files/', 967, 10)
// ste.moreChapEpub('files/', 'epub/', 967, 10)

if (process.argv.length < 3) {
    console.log('aucun paramètre indiquer')
    return
}

const argv = process.argv

const help = `
usage : app.js <option>

-h --help .............. affiche ceci
--no-verbose ........... mode silencieux
-d <chap> <nbChap> ..... télécharge du chapitre demander jusqu'au nombre indiquer
-c <chap> <nbChap> ..... convertie en epub du chapitre demander jusqu'au nombre indiquer
`

if (argv.indexOf('-h') !== -1 || argv.indexOf('--help') !== -1) {
    console.log(help)
    return
}

if (argv.indexOf('--no-verbose') !== -1)
    verbose(false)

if (argv.indexOf('-d') !== -1) {
    const i = argv.indexOf('-d')
    const chap = parseInt(argv[i + 1])
    const nbChap = parseInt(argv[i + 2])

    if (typeof chap === 'number' && typeof nbChap === 'number')
        ste.moreChapDownload('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/', 'files/', chap, nbChap)
    return
}

if (argv.indexOf('-c') !== -1) {
    const i = argv.indexOf('-c')
    const chap = parseInt(argv[i + 1])
    const nbChap = parseInt(argv[i + 2])

    if (typeof chap === 'number' && typeof nbChap === 'number')
        ste.moreChapEpub('files/', 'epub/', chap, nbChap)
    return
}