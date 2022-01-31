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
            utils.print('not found ' + url)
            fs.unlinkSync(dest)
            resolve(false)
        }

        res.pipe(file)

        file.on('finish', () => {
            file.close()
            utils.print('download from ' + url + ' to ' + dest)
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

    utils.print('finding page for chapter ' + chap + ' ...')
    const urlList = await utils.getListOfPage(newUrl, newDest)

    if (urlList.length === 0) {
        utils.print('chapter ' + chap + ' doesn\'t exist')
        return
    }

    if (fs.existsSync(newDest)) {
        utils.print(newDest + ' already exist')
        return
    }
    fs.mkdirSync(newDest)
    
    utils.print('starting download chapter ' + chap + ' ...')
    const urlProm = urlList.map(item => downloadPage(item.url, item.dest))

    await Promise.all(urlProm)
}


module.exports = {
    downloadChap,
    downloadPage,
}
