const ste = require('./src/scan_to_epub')
const fs = require('fs')

if (!fs.existsSync('files/'))
    fs.mkdirSync('files/')

if (!fs.existsSync('epub/'))
    fs.mkdirSync('epub/')

// ste.moreChapDownload('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/', 'files/', 967, 5)
// ste.moreChapEpub('files/', 'epub/', 967, 5)