const ste = require('./src/scan_to_epub')
const fs = require('fs')

//ste.moreChapDownload('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/', 'files/', 967, 10)
ste.moreChapEpub('files/', 'epub/', 967, 10)