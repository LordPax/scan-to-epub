const fs = require('fs')
const http = require('http')
const https = require('https')
const {match} = require('./lib-perso')
const exec = require('child_process').execSync

const requestGet = url => new Promise ((resolve, reject) => {
    const httpMethod = url.indexOf('https://') !== -1 ? https : http
    const req = httpMethod.get(url)

    req.on('response', res => resolve(res))
    req.on('error', err => reject(err))
})

// const requestPost = url => new Promise ((resolve, reject) => {
//     const httpMethod = url.indexOf('https://') !== -1 ? https : http
//     const req = httpMethod.request(url)

//     req.on('response', res => resolve(res))
//     req.on('error', err => reject(err))
// })

const convertWebpToPng = (pageDir, webpFile) => {
	const file = webpFile.split('.').filter(x => x !== 'webp')
	const pngFile = [...file, 'png'].join('.')

	exec('dwebp ' + pageDir + webpFile + ' -o ' + pageDir + pngFile)
	fs.unlinkSync(pageDir + webpFile)

	return pngFile
}

const verbose = (verb) => {
    if (!verb) {
        console = console || {}
        console.log = function(){}
    }
}

const found = async url => {
    const res = await requestGet(url)
    return res.statusCode !== 404
}

module.exports = {
    requestGet,
    found,
    convertWebpToPng,
    verbose
}