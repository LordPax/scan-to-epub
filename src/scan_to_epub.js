const dScan = require('./download_scan')
const cEpub = require('./convert_to_epub')
const utils = require('./include/utils')
require('dotenv').config()
const fs = require('fs')

/**
 * 
 * @param {string} url 
 * @param {string} dest 
 * @param {number} chap 
 * @param {number} nbChap 
 * @param {number} acc 
 * @returns {Promise<void>}
 */
const moreChapDownload = async (url, dest, chap, nbChap, acc = 0) => {
    if (!fs.existsSync(dest))
        fs.mkdirSync(dest)

    await dScan.downloadChap(url, dest, chap + acc)
    return acc < nbChap - 1 ? await moreChapDownload(url, dest, chap, nbChap, acc + 1) : true
}

/**
 * 
 * @param {string} dir 
 * @param {string} outDir 
 * @param {number} chap 
 * @param {number} nbChap 
 * @param {number} acc 
 * @returns {void}
 */
const moreChapEpub = (dir, outDir, chap, nbChap, acc = 0) => {
    if (!fs.existsSync(outDir))
        fs.mkdirSync(outDir)

    cEpub.chapToEpub(dir, outDir, chap + acc)
    return acc < nbChap - 1 ? moreChapEpub(dir, outDir, chap, nbChap, acc + 1) : true
}

// TODO : faire interChap
const interChap = async (url, chap, interval) => {
    // console.log('chap :', chap)
    if (await utils.found(url + chap)) {
        dScan.downloadChap(url, process.env.DEST, chap)
        
        setTimeout(interChap, interval, url, chap + 1, interval)
    }
    else {
        setTimeout(interChap, interval, url, chap, interval)
    }
}

module.exports = {
    moreChapDownload,
    moreChapEpub,
    interChap
}