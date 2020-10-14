const fs = require('fs')
const http = require('http')
const https = require('https')
const {match} = require('./lib-perso')

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

const found = async url => {
    const res = await requestGet(url)
    return res.statusCode !== 404
}

module.exports = {
    requestGet,
    found
}