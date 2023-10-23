# Scan to epub
## Description
Projet visant à télécharger des chapitres de scan et générer des fichiers .epub pour les liseuses.

## Source
* Les scan sont téléchargé depuis le site [lelscans](https://lelscans.net/lecture-ligne-one-piece)

## Format de l'url source
```
http://www.example.com/{chap}/{page}.{png|jpg|jpeg|webp}
```

## Dotenv
```
URL=https://lelscans.net/mangas/one-piece/
DEST=files/
EPUB=epub/
LOGDIR=log/
LOGFILE=scan.log
ID=bite
AUTHOR='Echiro Oda'
LANG=fr
GENRE='scan manga'
```

## Pre-requis
* Permet de convertir les fichiers .webp vers d'autre format d'images et inversement [libwebp-1.1.0](https://developers.google.com/speed/webp/docs/compiling)

## Installation
```bash
git clone https://github.com/LordPax/scan-to-epub.git && cd scan-to-epub
npm install
```

## Usage
```
Usage : scan2epub.js <option>

Options :
-h --help .................. Affiche ceci
-s --no-verbose ............ Mode silencieux
-dc <chap> [chap] .......... Télécharge et convertie les chapitres demandé
-d <chap> [chap] ........... Télécharge les chapitres demandé
-c <chap> [chap] ........... Convertie en epub les chapitres demandé
-i <chap> <interval> ....... Convertie le chapitre suivant a l'intervale demander en seconde (soon)
-l ......................... Active les log
--exist <chap> ............. Détermine si le chapitre existe
--clean <chap> [chap] ...... Supprime les chpitres demandé
--clean-all ................ Supprime tout le contenue des dossiers files et epub
```
