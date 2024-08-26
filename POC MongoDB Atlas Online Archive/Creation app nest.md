- **Création du projet NestJS** : J'ai utilisé `npm` pour installer les dépendances nécessaires, y compris `NestJS` lui-même et les bibliothèques ou modules supplémentaires que je prévoyais d'utiliser.
``` sh
C:\Users\t.avril\Documents\Stage-Technique>nest new first-nest-app
⚡  We will scaffold your app in a few seconds..

? Which package manager would you ❤️  to use? npm
CREATE first-nest-app/.eslintrc.js (688 bytes)
CREATE first-nest-app/.prettierrc (54 bytes)
CREATE first-nest-app/nest-cli.json (179 bytes)
CREATE first-nest-app/package.json (2022 bytes)
CREATE first-nest-app/README.md (3413 bytes)
CREATE first-nest-app/tsconfig.build.json (101 bytes)
CREATE first-nest-app/tsconfig.json (567 bytes)
CREATE first-nest-app/src/app.controller.ts (286 bytes)
CREATE first-nest-app/src/app.module.ts (259 bytes)
CREATE first-nest-app/src/app.service.ts (150 bytes)
CREATE first-nest-app/src/main.ts (216 bytes)
CREATE first-nest-app/src/app.controller.spec.ts (639 bytes)
CREATE first-nest-app/test/jest-e2e.json (192 bytes)
CREATE first-nest-app/test/app.e2e-spec.ts (654 bytes)

√ Installation in progress... ☕

🚀  Successfully created project first-nest-app
👉  Get started with the following commands:

$ cd first-nest-app
$ npm run start


                          Thanks for installing Nest 🙏
                 Please consider donating to our open collective
                        to help us maintain this package.


               🍷  Donate: https://opencollective.com/nest
```

Le projet s’est bien installé, tous les fichiers ont été générés.

- **Installation du driver MongoDB au projet** : Cette commande effectue les actions suivantes :

Télécharge le paquet mongodb et les dépendances dont il a besoin

Enregistre le package dans le répertoire node_modules

Enregistre les informations de dépendance dans le fichier package.json
``` sh
PS C:\Users\t.avril\Documents> cd .\nest-app\
PS C:\Users\t.avril\Documents\nest-app> npm install mongodb@6.8

added 11 packages, and audited 717 packages in 9s

110 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
## Création d'une chaîne de connexion
