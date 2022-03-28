# Scan to epub
## Description
Projet visant à télécharger des chapitres de scan et générer des fichiers .epub pour les liseuses.

## Source
<!-- * Les scan sont téléchargé depuis le site [lelscan-vf](https://lelscan-vf.cc/) -->
* Les scan sont téléchargé depuis le site [onepiece-scan](https://onepiece-scan.com/)

## Format de l'url source
* http://www.example.com/{nbchap}/{nbpage}.{png|jpg|jpeg|webp}

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
-h --help ............... affiche ceci
-s --no-verbose ......... mode silencieux
-dc <chap> [chap] ....... télécharge et convertie les chapitres demandé
-d <chap> [chap] ........ télécharge les chapitres demandé
-c <chap> [chap] ........ convertie en epub les chapitres demandé
-i <chap> <interval> .... convertie le chapitre suivant a l'intervale demander en seconde (soon)
--exist <chap> .......... détermine si le chapitre existe`
--clean <cahp> [chap] ...... Supprime les chpitres demandé (soon)
--clean-all ................ Supprime tout le contenue des dossiers files et epub
```
