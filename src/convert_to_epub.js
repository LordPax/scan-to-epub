const fs = require('fs')
const {match} = require('./include/lib-perso')
const nodepub = require("nodepub")
const path = require('path')

const chapToEpub = (dir, chap) => {
    const name = 'scan-' + chap
    const pageDir = dir + 'chap-' + chap + '/'
    const metadata = createMetaData(pageDir, name)
    const cover = fs.readdirSync(pageDir)[0]

    const epub = nodepub.document(metadata, pageDir + cover)

    epub.addSection(name, createContent(pageDir));

    epub.writeEPUB(
        e => console.log('Error:', e),
        pageDir, name,
        () => console.log('epub ' + name + '.epub generated succesfully')
    )
}

const createContent = pageDir => {
    return fs.readdirSync(pageDir).map(file =>{
        return '<img src = "../images/' + file + '">'
    }).join('<br/>')
}

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