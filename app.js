// const dScan = require('./src/download_scan')
// const cEpub = require('./src/convert_to_epub')
const ste = require('./src/scan_to_epub')
const fs = require('fs')

if (!fs.existsSync('files/'))
    fs.mkdirSync('files/')

// dScan.downloadPage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/01.png', 'files/01.png')
// dScan.downloadPage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/02.png', 'files/02.png')
// dScan.downloadPage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/03.png', 'files/03.png')

// dScan.downloadMorePage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/', 'files/', 20)

// dScan.downloadChap('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/', 'files/', 967)
// dScan.downloadChap('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/', 'files/', 1)

// ste.moreChapDownload('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/', 'files/', 967, 5)
// ste.moreChapEpub('files/', 967, 5)