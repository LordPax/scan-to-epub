# Scan to epub
## Description
Projet visant à télécharger des chapitres de scan et générer des fichiers .epub pour les liseuses.

## Source
* Les scan sont téléchargé depuis le site [scan-1.com](https://wwv.scan-1.com/one-piece)

## Pre-requis
* Permet de convertir les fichiers .webp vers d'autre format d'images et inversement [libwebp-1.1.0](https://developers.google.com/speed/webp/docs/compiling)

## Installation
```bash
git clone https://github.com/LordPax/scan-to-epub.git; cd scan-to-epub
npm install
```

## Usage
```
usage : app.js <option>

-h --help .............. affiche ceci
--no-verbose ........... mode silencieux
-d <chap> <nbChap> ..... télécharge du chapitre demander jusqu'au nombre indiquer
-c <chap> <nbChap> ..... convertie en epub du chapitre demander jusqu'au nombre indiquer
```