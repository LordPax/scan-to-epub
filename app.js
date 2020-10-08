const ste = require('./src/scan_to_epub')

// ste.downloadPage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/01.png', 'files/01.png')
// ste.downloadPage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/02.png', 'files/02.png')
// ste.downloadPage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/03.png', 'files/03.png')

// ste.downloadMorePage('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/chapitre-967/', 'files/', 20)

ste.downloadChap('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/', 'files/', 967)
ste.downloadChap('https://wwv.scan-1.com/uploads/manga/one-piece/chapters/', 'files/', 1)
