const fs = require('fs')
const http = require('http')
const https = require('https')
const {match} = require('./include/lib-perso')
const until = require('./include/until')

// modifie l'extention du fichier dans l'url et la destination pour :
// oldExt change pour newExt
// (url:string, dest:string, oldExt:string, newExt:string) => {newUrl:string, newDest:string}
const modifExt = (url, dest, oldExt, newExt) => {
    const tmpUrl = url.split('.').filter(x => x !== oldExt)
    const tmpDest = dest.split('.').filter(x => x !== oldExt)

    const newUrl = [...tmpUrl, newExt].join('.')
    const newDest = [...tmpDest, newExt].join('.')

    return {newUrl, newDest}
}

// modifie l'url et la destination en fonction de :
// .png change pour .jpg
// .jpg change pour .jpeg
// .jpeg change pour .webp
// .webp ne fait rien
// (url:string, dest:string) => {newUrl:string, newDest:string}
const modifUrl = (url, dest) => {
    const {newUrl, newDest} = match()
    .if(url.indexOf('.png') !== -1, () => 
        modifExt(url, dest, 'png', 'jpg')
    )
    .if(url.indexOf('.jpg') !== -1, () => 
        modifExt(url, dest, 'jpg', 'jpeg')
    )
    .if(url.indexOf('.jpeg') !== -1, () => 
        modifExt(url, dest, 'jpeg', 'webp')
    )
    .default(() => ({url, dest}))

    if (url.indexOf('.webp') === -1)
        console.log('retry form ' + newUrl + ' to ' + newDest)

    return {newUrl, newDest}
}

// fonction qui l'télécharge une page
// (url:string, dest:string) => void
const downloadPage = async (url, dest) => {
    const file = fs.createWriteStream(dest)
    const res = await until.requestGet(url)

    if (res.statusCode !== 200) {
        console.log('not found ' + url)
        fs.unlinkSync(dest)
        const {newUrl, newDest} = res.statusCode === 404 ? 
            modifUrl(url, dest) : {url, dest}
        
        return res.statusCode === 404 && url.indexOf('.webp') === -1 ? 
            downloadPage(newUrl, newDest) : false
    }

    res.pipe(file)

    file.on('finish', () => {
        file.close()
        console.log('download from ' + url + ' to ' + dest)
    })
}

// fonction récursive qui l'télécharge un nombre de page définie
// (url:string, dest:string, nbPage:number, acc?:number) => true
const downloadMorePage = (url, dest, nbPage, acc = 1) => {
    const nb = acc < 10 ? `00${acc}` : `0${acc}`
    const newUrl = url + nb + '.png'
    const newDest = dest + nb + '.png'

    downloadPage(newUrl, newDest)
    return acc < nbPage ? downloadMorePage(url, dest, nbPage, acc+1) : true
}

// fonction qui télécharge le chapitre demandé
// (url:string, dest:string, chap:number) => void
const downloadChap = (url, dest, chap) => {
    console.log('starting download chapter ' + chap + ' ...')
    const newUrl = url + chap + '/'
    const newDest = dest + 'chap-' + chap + '/'

    if (fs.existsSync(newDest)) {
        console.log(newDest + ' already exist')
        return
    }
        
    fs.mkdirSync(newDest)
    downloadMorePage(newUrl, newDest, 20)
}

module.exports = {
    downloadChap,
    modifExt,
    modifUrl,
    downloadPage
}