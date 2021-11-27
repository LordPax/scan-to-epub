const fs = require('fs')
const {match} = require('lib-perso')
const nodepub = require("nodepub")
const path = require('path')
const utils = require('./include/utils')
require('dotenv').config()

/**
 * utilise le contenue du dossier files et le convertie en epub
 * 
 * @param {string} dir 
 * @param {string} outDir 
 * @param {number} chap 
 * @returns {void}
 */
const chapToEpub = (dir, outDir, chap) => {
    const name = 'scan-' + chap
    const pageDir = dir + 'chap-' + chap + '/'

    if (!fs.existsSync(pageDir)) {
        console.log(pageDir + ' doesn\'t exist')
        return
    }

    if (fs.existsSync(outDir + name + '.epub')) {
        console.log(outDir + name + '.epub already exist')
        return
    }

    const files = fs.readdirSync(pageDir).map(file => {
        return file.indexOf('.webp') !== -1 
            ? utils.convertWebpToPng(pageDir, file) : file
    })

    const metadata = createMetaData(files, pageDir, name)
    const epub = nodepub.document(metadata, pageDir + files[0])
    createEpub(files, epub, outDir, name)
}

/**
 * 
 * @param {string} files 
 * @param {string} epub 
 * @param {string} outDir 
 * @param {string} name 
 * @return {void}
 */
const createEpub = (files, epub, outDir, name) => {
    files.filter(file => file.split('.')[0] !== '01')
    .forEach(file => {
        const nb = file.split('.')[0]
        epub.addSection('page ' + nb, '<img src = "../images/' + file + '">')
    })

    epub.writeEPUB(
        e => console.log('Error:', e),
        outDir, name,
        () => console.log('epub ' + name + '.epub generated successfully')
    )
}

/**
 * créé les métadata utile pour l'epub
 * 
 * @param {string} files 
 * @param {string} pageDir 
 * @param {string} name 
 * @returns {{
 *      id: string,
 *      title: string,
 *      author: string,
 *      images: string[],
 *      language: string,
 *      genre: string
 * }}
 */
const createMetaData = (files, pageDir, name) => ({
    id: process.env.ID,
    title: name,
    author: process.env.AUTHOR,
    images: files.map(file => pageDir + file),
    language: process.env.LANG,
    genre: process.env.GENRE
})

module.exports = {chapToEpub}