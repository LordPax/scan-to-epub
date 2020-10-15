const fs = require('fs')
const {match} = require('./include/lib-perso')
const nodepub = require("nodepub")
const path = require('path')
const until = require('./include/until')

// utilise le contenue du dossier files et le convertie en epub
// (dir:string, outDir:string, chap:number) => void
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
        return file.indexOf('.webp') !== -1 ?
            until.convertWebpToPng(pageDir, file) : file
    })

    const metadata = createMetaData(files, pageDir, name)
    const epub = nodepub.document(metadata, pageDir + files[0])
    createEpub(files, epub, outDir, name)
}

const createEpub = (files, epub, outDir, name) => {
    files.filter(file => file.split('.')[0] !== '01')
    .forEach(file => {
        const nb = file.split('.')[0]
        epub.addSection('page ' + nb, '<img src = "../images/' + file + '">')
    })

    epub.writeEPUB(
        e => console.log('Error:', e),
        outDir, name,
        () => console.log('epub ' + name + '.epub generated succesfully')
    )
}

// créé les métadata utile pour l'epub
// (pageDir:string, name:string) => object
const createMetaData = (files, pageDir, name) => {
    const images = files.map(file => pageDir + file)

    return {
        id : 'bite',
        title : name,
        author : 'Echiro Oda',
        images,
        language : 'fr',
        genre : 'scan manga'
    }
}

module.exports = {chapToEpub}