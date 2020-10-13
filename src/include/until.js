const fs = require('fs')
const http = require('http')
const https = require('https')
const {match} = require('./lib-perso')

const requestGet = (url, method) => new Promise ((resolve, reject) => {
    const req = method.get(url)

    req.on('response', res => resolve(res))
    req.on('error', err => reject(err))
})

const found = async (url, method) => {
    const res = await requestGet(url, method)
    return res.statusCode !== 404
}

module.exports = {
    requestGet,
    found
}