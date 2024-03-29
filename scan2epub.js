#!/usr/bin/node

const ste = require('./src/scan_to_epub');
const fs = require('fs');
const {
    Constant,
    verbose,
    foundChap,
    print,
    clean,
} = require('./src/include/utils');
require('dotenv').config();

if (process.argv.length < 3) {
    print('aucun paramètre indiquer');
    return;
}

const { argv } = process;

const help = `Usage : scan2epub.js <option>

Options :
-h --help .................. Affiche ceci
-s --no-verbose ............ Mode silencieux
-dc <chap> [chap] .......... Télécharge et convertie les chapitres demandé
-d <chap> [chap] ........... Télécharge les chapitres demandé
-c <chap> [chap] ........... Convertie en epub les chapitres demandé
-i <chap> <interval> ....... Convertie le chapitre suivant a l'intervale demander en seconde (soon)
-l ......................... Active les log
--exist <chap> ............. Détermine si le chapitre existe
--clean <chap> [chap] ...... Supprime les chpitres demandé
--clean-all ................ Supprime tout le contenue des dossiers files et epub`;

if (argv.indexOf('-h') !== -1 || argv.indexOf('--help') !== -1) {
    print(help);
    return;
}

if (argv.indexOf('-l') !== -1) Constant.ALLOWLOG = true;

if (argv.indexOf('--exist') !== -1) {
    (async () => {
        const i = argv.indexOf('--exist');
        const chap = parseInt(argv[i + 1]);
        if (await foundChap(process.env.URL, chap))
            print('chapter ' + chap + ' exist');
        else print('chapter ' + chap + " doesn't exist");
    })();
}

if (argv.indexOf('--no-verbose') !== -1 || argv.indexOf('-s') !== -1)
    verbose(false);

if (argv.indexOf('--clean-all') !== -1) {
    print('deleting ' + process.env.DEST + ' and ' + process.env.EPUB + ' ...');
    if (fs.existsSync(process.env.DEST))
        fs.rmSync(process.env.DEST, { recursive: true });
    if (fs.existsSync(process.env.EPUB))
        fs.rmSync(process.env.EPUB, { recursive: true });
    return;
}

if (argv.indexOf('--clean') !== -1) {
    const i = argv.indexOf('--clean');
    const chap = parseInt(argv[i + 1]);
    const chap2 = argv[i + 2] ? parseInt(argv[i + 2]) : parseInt(argv[i + 1]);
    const nbChap = chap2 - chap + 1;

    if (typeof chap === 'number' && typeof nbChap === 'number')
        clean(chap, nbChap);

    return;
}

if (argv.indexOf('-dc') !== -1) {
    (async () => {
        // TODO : améliorer la vérification des input
        const i = argv.indexOf('-dc');
        const chap = parseInt(argv[i + 1]);
        const chap2 = argv[i + 2]
            ? parseInt(argv[i + 2])
            : parseInt(argv[i + 1]);
        const nbChap = chap2 - chap + 1;

        if (typeof chap === 'number' && typeof nbChap === 'number') {
            await ste.moreChapDownload(
                process.env.URL,
                process.env.DEST,
                chap,
                nbChap,
            );
            ste.moreChapEpub(process.env.DEST, process.env.EPUB, chap, nbChap);
        }
    })();
    return;
}

if (argv.indexOf('-d') !== -1) {
    const i = argv.indexOf('-d');
    const chap = parseInt(argv[i + 1]);
    const chap2 = argv[i + 2] ? parseInt(argv[i + 2]) : parseInt(argv[i + 1]);
    const nbChap = chap2 - chap + 1;

    if (typeof chap === 'number' && typeof nbChap === 'number')
        ste.moreChapDownload(process.env.URL, process.env.DEST, chap, nbChap);
    return;
}

if (argv.indexOf('-c') !== -1) {
    const i = argv.indexOf('-c');
    const chap = parseInt(argv[i + 1]);
    const chap2 = argv[i + 2] ? parseInt(argv[i + 2]) : parseInt(argv[i + 1]);
    const nbChap = chap2 - chap + 1;

    if (typeof chap === 'number' && typeof nbChap === 'number')
        ste.moreChapEpub(process.env.DEST, process.env.EPUB, chap, nbChap);
    return;
}

if (argv.indexOf('-i') !== -1) {
    const i = argv.indexOf('-i');
    const chap = parseInt(argv[i + 1]);
    const interval = parseInt(argv[i + 2]);

    ste.interChap(process.env.URL, chap, interval);
    // setInterval(ste.interChap, interval, process.env.URL, chap)
}
