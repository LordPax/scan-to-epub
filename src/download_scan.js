const fs = require('fs')
const {match} = require('lib-perso')
const utils = require('./include/utils')

/**
 * fonction qui l'télécharge une page
 * 
 * @param {string} url 
 * @param {string} dest 
 * @return {Promise<boolean>} 
 */
const downloadPage = (url, dest) => new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    utils.requestGet(url).then(res => {
        if (res.statusCode === 404) {
            console.log('not found ' + url)
            fs.unlinkSync(dest)
            resolve(false)
        }

        res.pipe(file)

        file.on('finish', () => {
            file.close()
            console.log('download from ' + url + ' to ' + dest)
            resolve(true)
        })
    })
})

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
    downloadPage,
    getListOfPage
}