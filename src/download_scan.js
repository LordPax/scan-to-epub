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
    const urlList = await utils.getListOfPage(newUrl, newDest)
    
    console.log('starting download chapter ' + chap + ' ...')
    const urlProm = urlList.map(item => downloadPage(item.url, item.dest))

    await Promise.all(urlProm)
}


module.exports = {
    downloadChap,
    downloadPage,
}
