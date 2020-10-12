const fs = require('fs')
const {match} = require('./include/lib-perso')
const nodepub = require("nodepub")
const path = require('path')

// utilise le contenue du dossier files et le convertie en epub
// (dir:string, outDir:string, chap:number) => void
const chapToEpub = (dir, outDir, chap) => {
    const name = 'scan-' + chap
    const pageDir = dir + 'chap-' + chap + '/'
    const metadata = createMetaData(pageDir, name)
    const files = fs.readdirSync(pageDir)
    const epub = nodepub.document(metadata, pageDir + files[0])

    files.forEach(file => {
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
const createMetaData = (pageDir, name) => {
    const images = fs.readdirSync(pageDir).map(file => pageDir + file)

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