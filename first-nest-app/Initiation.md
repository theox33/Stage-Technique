# Initiation à NestJS
J’ai décidé sous les conseils d’un collègue alternant de continuer à faire des POC personnels – de me former en ligne.
En ce moment, il est question de se renseigner sur NestJS. Personne n’est sur le coup, donc je me lance.

## Introduction de NestJS

`NestJS` est un framework moderne, performant et extensible pour `Node.js`, conçu pour **construire des applications côté serveur évolutives et maintenables**. Il est conçu pour fournir une base architecturale solide en utilisant `TypeScript` et en adoptant des modèles architecturaux tels que _l'injection de dépendances_, _les modules_ et les _décorateurs_. NestJS est réputé pour son support de la construction d'API RESTful, d'API GraphQL et d'applications basées sur WebSocket. Il offre une variété de fonctionnalités et d'outils pour **rationaliser le processus de développement** et **garantir la maintenabilité du code.**

## Installation de l’environnement de développement

Pour commencer à développer avec `NestJS`, j'ai d'abord configuré mon environnement de développement. Voici les étapes que j'ai suivies :

- **Installation de Node.js** : J'ai vérifié que Node.js était installé sur mon système car NestJS est construit sur Node.js. Je l’ai téléchargé sur le site officiel et exécuté l’installeur.

- **Création d'un nouveau projet NestJS** : J'ai utilisé le CLI de Nest pour créer un nouveau projet NestJS.
``` sh
PS C:\Users\t.avril\Documents\Stage-Technique\first-nest-app> npm i -g @nestjs/cli@latest

added 260 packages in 38s

53 packages are looking for funding
  run `npm fund` for details
npm notice
npm notice New patch version of npm available! 10.8.1 -> 10.8.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v10.8.2
npm notice To update run: npm install -g npm@10.8.2
npm notice
```

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

Le projet s’est bien installé, tous les fichiers ont été générés :

![Image](https://github.com/user-attachments/assets/8622be9b-1d9d-49f8-b447-02f7230fe8d2)

## Analyse des fichiers générés

`NestJS` suit une structure de projet bien définie qui aide à organiser le code et à maintenir la maintenabilité. Voici les composants clés de la structure typique d'un projet `NestJS` que j'ai explorés :

•	`src/` : Ce répertoire contient le code principal de l'application.
•	`main.ts` : Le point d'entrée de l'application NestJS.
•	`app.module.ts` : Le module racine qui orchestre les composants et modules de l'application.
•	`controllers/` : Les contrôleurs définissent la logique de gestion des requêtes pour les routes.
•	`providers/` : Les providers sont responsables de l'encapsulation et de la gestion de la logique métier et des services.
•	`modules/` : Les modules regroupent les composants, contrôleurs et providers connexes.
•	`nestjs.config.json` ou fichiers `.env` : Fichiers de configuration pour les paramètres spécifiques à l'environnement.
•	`public/` : Ce répertoire est utilisé pour servir des fichiers statiques.
•	`test/` : Fichiers de test et configurations pour tester l'application.

### /src/

Dans le dossier `/src`, plusieurs fichiers .ts (TypeScript) ont été générés. Etant très similaire à javascript, il n’est pas compliqué de s’adapter.

Le fichier `main.ts` est le fichier principal du projet. On peut voir qu’au moment de l’exécution de notre application, on écoutera le port 3000 :
``` typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

```
On voit également que `AppModule` est utilisé pour créer ce projet.
En allant dans ce module, on ouvre le fichier `app.module.ts` :
``` typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```
Ici, on peut apercevoir les différents modules du projet : `AppController` et `AppService`.
En allant sur la définition de la classe `AppController`, on se retrouve sur le fichier `app.controller.ts` :
``` typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

```
On voit ici que cette classe possède une requête de type accesseur ainsi qu’une référence à la méthode `getHello()` qui retourne une chaine de caractères, ou plus précisément le service défini par la méthode `getHello()`. Je vois que `appService` provient du fichier `app.service.ts` : je m’y rends :
``` typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

```
On remarque que ce service renvoie bien une chaine de caractères « Hello World ! ».
Ainsi, on peut se douter qu’au moment où on va exécuter le point de terminaison racine du projet, on recevra « Hello World ! ».

Il y a également dans le dossier `src` un dernier fichier nommé `app.controller.spec.ts` :
``` typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

```

À en juger par son apparence et le nom des méthodes, il s’agit très probablement d’un fichier de test pour le service `controller` par son nom.

### /test/

Le dossier `test` possède des tests d’API pour notre racine.

### /.

Le fichier `nest-cli.json` contient des informations sur mon nest-cli actuel.

Le `package-lock.json` contient toutes les informations relatives aux modules nodes.

Le `package.json` résume le projet avec les dépendances utilisées et les scripts utilisés. Cela sera utile pour lancer des commandes spécifiques, notamment le script `start:dev` permettant d’exécuter l’application en mode développement.

## Première exécution du projet

Je lance la commande `npm run start :dev` et vais sur mon navigateur internet sur le port 3000 : `localhost :3000`.
```
[16:50:34] Starting compilation in watch mode...

[16:50:42] Found 0 errors. Watching for file changes.

[Nest] 62192  - 31/07/2024 16:50:48     LOG [NestFactory] Starting Nest application...
[Nest] 62192  - 31/07/2024 16:50:49     LOG [InstanceLoader] AppModule dependencies initialized +9ms
[Nest] 62192  - 31/07/2024 16:50:49     LOG [RoutesResolver] AppController {/}: +3ms
[Nest] 62192  - 31/07/2024 16:50:49     LOG [RouterExplorer] Mapped {/, GET} route +1ms
[Nest] 62192  - 31/07/2024 16:50:49     LOG [NestApplication] Nest application successfully started +2ms
```

![Image](https://github.com/user-attachments/assets/6ab339f4-5ff5-4562-b284-51108d7f3ebb)

Le site fonctionne comme attendu.
