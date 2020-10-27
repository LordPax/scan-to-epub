const dScan = require('./download_scan')
const cEpub = require('./convert_to_epub')
const until = require('./include/until')
require('dotenv').config()
const fs = require('fs')

const moreChapDownload = (url, dest, chap, nbChap, acc = 0) => {
    if (!fs.existsSync(dest))
        fs.mkdirSync(dest)

    dScan.downloadChap(url, dest, chap + acc)
    return acc < nbChap - 1 ? moreChapDownload(url, dest, chap, nbChap, acc + 1) : true
}

const moreChapEpub = (dir, outDir, chap, nbChap, acc = 0) => {
    if (!fs.existsSync(outDir))
        fs.mkdirSync(outDir)

    cEpub.chapToEpub(dir, outDir, chap + acc)
    return acc < nbChap - 1 ? moreChapEpub(dir, outDir, chap, nbChap, acc + 1) : true
}

const interChap = async (url, chap, interval) => {
    // console.log('chap :', chap)
    if (await until.found(url + chap)) {
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