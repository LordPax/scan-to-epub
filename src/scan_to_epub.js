const fs = require('fs')
const http = require('http')
const https = require('https')
const {match} = require('./include/lib-perso')
const exec = require('child_process').execSync

// wget -q -O files/01.png https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/01.png

const chapToEpub = url => {

}

const pngToJpg = (url, dest) => {
    const tmpUrl = url
    .split('.')
    .filter(x => x !== 'png')

    const tmpDest = dest
    .split('.')
    .filter(x => x !== 'png')

    const newUrl = [...tmpUrl, 'jpg'].join('.')
    const newDest = [...tmpDest, 'jpg'].join('.')

    return {newUrl, newDest}
}

const downloadPage = (url, dest) => {
    const file = fs.createWriteStream(dest)
    const httpMethod = url.indexOf('https://') !== -1 ? https : http

    const request = httpMethod.get(url, response => {
        if (response.statusCode !== 200) {
            fs.unlinkSync(dest)
            if (response.statusCode === 404 && url.indexOf('.png') !== -1) {
                console.log('not found ' + url)
                const {newUrl, newDest} = pngToJpg(url, dest)
                console.log('retry form ' + newUrl + ' to ' + newDest)
                return downloadPage(newUrl, newDest)
            }
            return
        }

        response.pipe(file)

        file.on('finish', () => {
            file.close()
            console.log('download form ' + url + ' to ' + dest)
        })
    })

    request.on('error', err => fs.unlinkSync(dest))
    file.on('error', err => fs.unlinkSync(dest))
}

const downloadMorePage = (url, dest, nbPage, acc = 1) => {
    const nb = acc < 10 ? `0${acc}` : `${acc}`
    const newUrl = url + nb + '.png'
    const newDest = dest + nb + '.png'

    downloadPage(newUrl, newDest)
    return acc < nbPage ? downloadMorePage(url, dest, nbPage, acc+1) : true
}

const downloadChap = (url, dest, chap) => {
    console.log('starting download chapter ' + chap + ' ...')
    const newUrl = url + 'chapitre-' + chap + '/'
    const newDest = dest + 'chap-' + chap + '/'
    fs.mkdirSync(newDest)
    downloadMorePage(newUrl, newDest, 20)
}

module.exports = {
    chapToEpub,
    downloadPage,
    downloadChap,
    downloadMorePage
}