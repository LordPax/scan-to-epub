const dScan = require('./download_scan')
const cEpub = require('./convert_to_epub')
const fs = require('fs')

const moreChapDownload = (url, dest, chap, nbChap, acc = 0) => {
	dScan.downloadChap(url, dest, chap + acc)
	return acc < nbChap ? moreChapDownload(url, dest, chap, nbChap, acc + 1) : true
}

const moreChapEpub = (dir, chap, nbChap, acc = 0) => {
	cEpub.chapToEpub(dir, chap + acc)
	return acc < nbChap ? moreChapEpub(dir, chap, nbChap, acc + 1) : true
}

module.exports = {
	moreChapDownload,
	moreChapEpub
}