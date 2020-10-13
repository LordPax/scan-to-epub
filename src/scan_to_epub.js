const dScan = require('./download_scan')
const cEpub = require('./convert_to_epub')
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

module.exports = {
    moreChapDownload,
    moreChapEpub
}