const fs = require('fs');
const http = require('http');
const https = require('https');
const { match } = require('lib-perso');
const exec = require('child_process').execSync;
require('dotenv').config();

class Constant {
    static ALLOWLOG = false;
}

/**
 * envoie une requête GET
 *
 * @param {string} url
 * @returns {Promise<object>}
 */
const requestGet = (url) =>
    new Promise((resolve, reject) => {
        const httpMethod = url.indexOf('https://') !== -1 ? https : http;
        const req = httpMethod.get(url);

        req.on('response', (res) => resolve(res));
        req.on('error', (err) => reject(err));
    });

/**
 * convertir une image webp en png
 *
 * @param {string} pageDir
 * @param {string} webpFile
 * @returns {string}
 */
const convertWebpToPng = (pageDir, webpFile) => {
    if (!fs.existsSync(pageDir + webpFile)) return '';

    const file = webpFile.split('.').filter((x) => x !== 'webp');
    const pngFile = [...file, 'png'].join('.');

    exec('dwebp ' + pageDir + webpFile + ' -o ' + pageDir + pngFile);
    fs.unlinkSync(pageDir + webpFile);

    return pngFile;
};

const printLog = (msg) => {
    if (!fs.existsSync(process.env.LOGDIR)) fs.mkdirSync(process.env.LOGDIR);

    const d = new Date();
    const format = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`;
    const output = `${format} : ${msg}\n`;

    fs.writeFileSync(process.env.LOGDIR + process.env.LOGFILE, output, {
        flag: 'a',
    });
};

const verbose = (verb) => {
    if (!verb) {
        // console = console || {};
        console.log = () => {};
    }
};

const print = (msg) => {
    if (Constant.ALLOWLOG) printLog(msg);
    else console.log(msg);
};

/**
 * retourne une liste d'image à télécharge
 *
 * @param {string} url
 * @param {string} dest
 * @param {number} page
 * @param {{url: string, dest: string}[]} list
 * @return {Promise<{url: string, dest: string}[]>}
 */
const getListOfPage = async (url, dest, page = 1, list = []) => {
    const nb = page < 10 ? `0${page}` : `${page}`;

    const result = await Promise.all([
        found(url + nb + '.png'),
        found(url + nb + '.jpg'),
        found(url + nb + '.jpeg'),
        found(url + nb + '.webp'),
    ]);

    const validUrl = match(result.indexOf(true))
        .case(0, () => ({ url: url + nb + '.png', dest: dest + nb + '.png' }))
        .case(1, () => ({ url: url + nb + '.jpg', dest: dest + nb + '.jpg' }))
        .case(2, () => ({ url: url + nb + '.jpeg', dest: dest + nb + '.jpeg' }))
        .case(3, () => ({ url: url + nb + '.webp', dest: dest + nb + '.webp' }))
        .default(() => false);

    return validUrl !== false
        ? await getListOfPage(url, dest, page + 1, [...list, validUrl])
        : list;
};

/**
 * test l'existence d'une url
 *
 * @param {string} url
 * @returns {Promise<boolean>}
 */
const found = async (url) => {
    const res = await requestGet(url);
    return res.statusCode !== 404;
};

/**
 * test l'existence d'un chapitre
 *
 * @param {string} url
 * @param {number} chap
 * @returns {Promise<boolean>}
 */
const foundChap = async (url, chap) => {
    const result = await Promise.all([
        found(url + chap + '/' + '01.png'),
        found(url + chap + '/' + '01.jpg'),
        found(url + chap + '/' + '01.jpeg'),
        found(url + chap + '/' + '01.webp'),
    ]);

    return result.indexOf(true) !== -1;
};

/**
 * supprime les chapitres demandé
 *
 * @param {integer} chap - le chapitre ou commancer
 * @param {integer} nbChap - le nombre de chapitre a partir du paramètre chap
 * @param {integer} [acc] - compteur qui s'incremente a chaque tours
 * @returns {void}
 */
const clean = (chap, nbChap, acc = 0) => {
    const curChap = chap + acc;
    const file = process.env.DEST + 'chap-' + curChap;
    const epub = process.env.EPUB + 'scan-' + curChap + '.epub';

    if (fs.existsSync(file) || fs.existsSync(epub))
        print('removing chapter ' + curChap + ' ...');

    fs.existsSync(file) && fs.rmSync(file, { recursive: true });
    fs.existsSync(epub) && fs.rmSync(epub, { recursive: true });

    return acc < nbChap - 1 ? clean(chap, nbChap, acc + 1) : null;
};

module.exports = {
    requestGet,
    found,
    convertWebpToPng,
    verbose,
    getListOfPage,
    foundChap,
    print,
    Constant,
    clean,
};
