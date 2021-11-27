const fs = require('fs')
const {match} = require('lib-perso')
const utils = require('./include/utils')

/** 
 * modifie l'extention du fichier dans l'url et la destination pour :
 * oldExt change pour newExt
 * 
 * @param {String} url
 * @param {String} dest
 * @param {String} oldExt
 * @param {String} newExt
 * @return {{newUrl:string, newDest:string}}
 */
const modifExt = (url, dest, oldExt, newExt) => {
    const tmpUrl = url.split('.').filter(x => x !== oldExt)
    const tmpDest = dest.split('.').filter(x => x !== oldExt)

    const newUrl = [...tmpUrl, newExt].join('.')
    const newDest = [...tmpDest, newExt].join('.')

    return {newUrl, newDest}
}

/**
 * modifie l'url et la destination en fonction de :
 * .png change pour .jpg, 
 * .jpg change pour .jpeg, 
 * .jpeg change pour .webp, 
 * .webp ne fait rien, 
 * 
 * @param {string} url 
 * @param {string} dest 
 * @return {{newUrl:string, newDest:string}}
 */
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

/**
 * fonction qui l'télécharge une page
 * 
 * @param {string} url 
 * @param {string} dest 
 * @return {Promise<boolean>} 
 */
const downloadPage = (url, dest) => new Promise((resolve, reject) => {
    utils.requestGet(url).then(res => {
        const file = fs.createWriteStream(dest)

        res.pipe(file)

        file.on('finish', () => {
            file.close()
            console.log('download from ' + url + ' to ' + dest)
            resolve(true)
        })
    })
})

/**
 * fonction récursive qui l'télécharge un nombre de page définie
 * 
 * @param {string} url 
 * @param {string} dest 
 * @param {number} nbPage 
 * @param {number} acc
 * @param {Promise<void>[]} promise 
 * @return {Promise<void>[]} 
 */
const downloadMorePage = (url, dest, nbPage, acc = 1, promise = []) => {
    const nb = acc < 10 ? `0${acc}` : `${acc}`
    // const nb = acc < 10 ? `00${acc}` : `0${acc}`
    const newUrl = url + nb + '.png'
    const newDest = dest + nb + '.png'

    const prom = [...promise, downloadPage(newUrl, newDest)]
    return acc < nbPage ? downloadMorePage(url, dest, nbPage, acc+1, prom) : prom
}

/**
 * fonction qui télécharge le chapitre demandé
 * 
 * @param {string} url 
 * @param {string} dest 
 * @param {number} chap 
 * @return {Promise<void>} 
 */
const downloadChap = async (url, dest, chap) => {
    const newUrl = url + chap + '/'
    const newDest = dest + 'chap-' + chap + '/'

    if (fs.existsSync(newDest)) {
        console.log(newDest + ' already exist')
        return
    }

    fs.mkdirSync(newDest)

    console.log('finding page for chapter ' + chap + ' ...')
    const urlList = await getListOfPage(newUrl, newDest)
    
    console.log('starting download chapter ' + chap + ' ...')
    const urlProm = urlList.map(item => downloadPage(item.url, item.dest))

    await Promise.all(urlProm)
}

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
    const nb = page < 10 ? `0${page}` : `${page}`

    const result = await Promise.all([
        utils.found(url + nb + '.png'),
        utils.found(url + nb + '.jpg'),
        utils.found(url + nb + '.jpeg'),
        utils.found(url + nb + '.webp')
    ])
    
    const validUrl = match(result.indexOf(true))
    .case(0, () => ({ url: url + nb + '.png', dest: dest + nb + '.png' }))
    .case(1, () => ({ url: url + nb + '.jpg', dest: dest + nb + '.jpg' }))
    .case(2, () => ({ url: url + nb + '.jpeg', dest: dest + nb + '.jpeg' }))
    .case(3, () => ({ url: url + nb + '.webp', dest: dest + nb + '.webp' }))
    .default(() => false)

    return validUrl !== false ? await getListOfPage(url, dest, page + 1, [...list, validUrl]) : list
}

module.exports = {
    downloadChap,
    modifExt,
    modifUrl,
    downloadPage,
    getListOfPage
}