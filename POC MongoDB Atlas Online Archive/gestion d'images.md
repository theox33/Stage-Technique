# 🖼️ Gestion d'images

Maintenant que je dais comment interragir avec le cluster MongoDB Atlas avec une application NestJS, il est question de s'interresser à la gestion d'images.
Comme je l'avais expliqué lors de l'introduction du projet MongoDB, le but principal est de pouvoir facailiter et optimiser le stockage d'images client notemment en les archivant avec `Online Archive`.

Pour stocker des images dans MongoDB Atlas, il existe plusieurs méthodes, mais l'une des plus courantes consiste à utiliser `GridFS`, une spécification MongoDB permettant de gérer des fichiers de grande taille, tels que des images.

## Introduction à GlusterFS

GridFS est une spécification de MongoDB qui permet de stocker et récupérer des fichiers volumineux, généralement supérieurs à la limite de 16 Mo, qui est la taille maximale d'un document BSON dans MongoDB. Au lieu de stocker un fichier entier dans un seul document, GridFS divise le fichier en plusieurs morceaux (ou chunks) et les stocke dans une collection spécifique. Ces morceaux sont ensuite réassemblés à la demande pour permettre de récupérer le fichier complet.

GridFS utilise deux collections principales :

- `fs.files` : Cette collection contient les métadonnées de chaque fichier, telles que le nom du fichier, la taille, le type MIME, la date de téléchargement, etc.
- `fs.chunks` : Cette collection stocke les différents morceaux du fichier, chaque morceau étant un sous-ensemble des données du fichier.

Par exemple, un fichier de 100 Mo sera divisé en plusieurs parties de 255 Ko (par défaut), et ces parties seront stockées dans la collection `fs.chunks`. Les métadonnées du fichier, telles que son nom et sa taille totale, seront stockées dans `fs.files`.
Grâce à la bibliothèque `multer-gridfs-storage`, je peux gérer facilement l'envoi et le stockage des images dans MongoDB.

