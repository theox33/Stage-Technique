### [🔙 Retour au projet](https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/HOME.md)

# 🔧 Controlleurs et routage

## 📑 Table des matières

| <div align="left"><h2> <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Controlleurs%20et%20routage.md#%EF%B8%8F-controlleurs">:joystick: Controlleurs</a></h2><ul><li><h3>📥📤 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Controlleurs%20et%20routage.md#-requ%C3%AAtes-get-et-post-1">Requêtes `@Get` et `@Post`</a></h3></li></ul><h2>:compass: <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Controlleurs%20et%20routage.md#-routes">Routes</a></h2><ul><li><h3>🔰 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Controlleurs%20et%20routage.md#-prise-en-main-1">Prise en main</a></h3></li><li><h3>⚠️ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Controlleurs%20et%20routage.md#%EF%B8%8F-probl%C3%A8me-rencontr%C3%A9-1">Problème rencontré</a></h3></li></ul><h2>🔗 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Controlleurs%20et%20routage.md#-cha%C3%AEnes-de-requ%C3%AAte-query-strings">Chaîne de requête *(Query Strings)*</a></h2><ul><li><h3>🔰 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Controlleurs%20et%20routage.md#-prise-en-main-3">Prise en main</a></h3></ul></li> |
|---|

## 🕹️ Controlleurs

Les controlleurs sont des modules ou des cmposants chargés de traiter et de répondre aux demandes entrantes des utilisateurs, tels les naviguateurs web ou les consommateurs d'API. Ils sont chargés de traiter les données, de les envoyer à la base de données, de les récupérer et de les renvoyer à l'utilisateur.

Dans le projet que j’ai créé avec NestJS, je possède un controlleur par défaut qui est le fichier `/src/app.controller.ts`.

Un contrôleur dans NestJS est responsable de la gestion des requêtes HTTP entrantes, de leur traitement et de la fourniture d'une réponse appropriée. Les contrôleurs encapsulent la logique pour des routes ou des points d'accès spécifiques de l’application. Ils sont généralement responsables de la validation des données d'entrée, de l'invocation de services ou de la logique métier, et du retour des réponses. Dans NestJS, les contrôleurs sont décorés avec le décorateur @Controller(), et on peut définir les gestionnaires de routes sous forme de méthodes au sein de la classe du contrôleur.

### 📥📤 Requêtes `@Get` et `@Post`

Je créé une nouvelle requête d’entrée `@Get` que je mets sur un point d’entrée différent que la racine : `@Get(‘/askquestion’)`. La requête sera donc accessible vers le lien : `localhost:3000/askquestion`.
Je définie la méthode `askQuestion` qui retourne `’What is your name ?’`.

``` typescript
  @Get('/askquestion')
  askQuestion(): string {
    return 'What is your name?';
  }
```

Ainsi, j’obtiens ceci dans le navigateur :

![image](https://github.com/user-attachments/assets/01b4ce34-7c21-43fb-afd7-277b525baea4)


Maintenant, pour obtenir des données depuis le frontend, il faut utiliser `@Post`. On pourra donc envoyer notre réponse sur le point d’entrée `’/answer’`.
Je créé la méthode `answer()` qui retournera un objet comme réponse.

Il faut savoir que quand on souhaite obtenir les données d’un utilisateur à un moment précis, on doit créer un `DTO` *(Data Transfer Object)*.
Je créé donc un dossier `/src/dto/` où je créé le fichier `app.dto.ts`.

Un `DTO` s’écrit comme un objet classique, on peut utiliser une classe pour cela.
Je définis la classe `AnswerDto` qui aura pour seule valeur : `answer`.

``` typescript
export class AnswerDto {
    answer
}
```

À présent, si je souhaite recevoir des données à partir d’une requête, il faut utiliser `@Body` en paramètre de la méthode.
Je déclare également `getAnswerDto` qui nous fournira les données que l’on souhaite accéder, en l’occurrence : `AnswerDto`.

``` typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/askquestion')
  askQuestion(): string {
    return 'What is your name?';
  }

  @Post('/answer')
  answer(@Body() getAnswerDto: AnswerDto) {
    return getAnswerDto.answer
  }
}

```

Finalement, en allant sur mon navigateur web, j’ouvre les outils de développement web et me rends dans la `console réseau`. D’ici, je vais pouvoir envoyer ma requête.

Comme on souhaite obtenir une réponse, je vais envoyer une requête en `JSON` où je vais attribuer une valeur à `answer` :

![image](https://github.com/user-attachments/assets/bd7f2dfb-56bd-4642-8210-fe16ae818fda)


On obtient bien la réponse :

![image](https://github.com/user-attachments/assets/594d6505-4fa8-40ab-b6ca-f2dce0cde2bb)

___

## 🧭 Routes

Les routes permettent d'extraire les valeurs depuis l'URL d'une requête web, ce qui est essentiel pour les applications web dynamiques.

Par exemple, la route `'/users/:userId'` définit un paramètre nommé `userId`. Ce paramètre peut être extrait et utilisé dans le code lorsque cela est nécessaire.

Les routes permettent de créer des URL dynamiques et paramétrées, facilitant la gestion des ressources au sein des applications web.

### 🔰 Prise en main
Revenons aux API que j’ai créées hier : `'/askquestion'` et `'/answer'` dans `src/app.controller.ts`.

Voyons ce qui se passe lorsque j’ajoute un paramètre de route. Supposons que je passe un `id` dans l'URL et que je souhaite l'afficher dans le corps de la page HTML en retour.

Pour accéder à ce paramètre, je dois utiliser le décorateur `@Param('id')` dans la méthode `getRouteParam`, et j’ajoute une variable `userId` (le nom est arbitraire) qui recevra la valeur de `id`.

Puisque je souhaite afficher cette valeur dans le corps de notre page web, je retourne cette variable.

``` typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  getRouteParam(@Param('id') userId: string) {
    return `${userId}`
  }

  @Get('/askquestion')
  askQuestion() {
    return 'What is your name?'
  }

  @Post('/answer')
  answer(@Body() getAnswerDto: AnswerDto) {
    return getAnswerDto.answer
  }
}

```

Maintenant, je démarre mon application web avec `npm run start :dev` et je me rends dans ma `console réseau`.

Je lance une requête `GET http://localhost:3000/test-de-valeur` et normalement, je devrais retrouver `test-de-valeur` dans le corps de ma page web :

![Image](https://github.com/user-attachments/assets/0c3ac14d-0f65-4329-b380-0745cc8b7788)
![Image](https://github.com/user-attachments/assets/91341dcf-2c85-4cf8-8d22-eab4ff57e2a6)

### ⚠️ Problème rencontré

Si je lance une requête `@Get` vers `http://localhost :3000/askquestion`, je devrais normalement recevoir le même résultat que la dernière fois, à savoir : `’What is your name ?’`.

Cependant, j’obtiens `askquestion` en réponse :

![Image](https://github.com/user-attachments/assets/6df7cdce-ea02-441b-98e6-ee5a758b8fbe)

C’est parce que le code s’exécute de haut en bas et donc, avant exécuter `@Get(‘/askquestion’)`, il exécute `@Get(‘ :id’)`.

Cela signifie que l’application web traite `askquestion` en tant que l’`id` de la requête `@Get(‘ :id’)`.

Pour régler ce problème, il suffit juste de déplacer la requête `@Get(‘ :id’)` après `@Get(‘/askquestion’)` :

``` typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/askquestion')
  askQuestion() {
    return 'What is your name?'
  }

  @Post('/answer')
  answer(@Body() getAnswerDto: AnswerDto) {
    return getAnswerDto.answer
  }

  @Get(':id')
  getRouteParam(@Param('id') userId: string) {
    return `${userId}`
  }
}

```

En faisant à nouveau la requête, j’obtiens à nouveau le résultat attendu pour `GET http://localhost:3000/askquestion` :

![Image](https://github.com/user-attachments/assets/f092f2f8-12f8-4b08-8063-4a2ae4402043)

___

## 🔗 Chaînes de requête (Query Strings)

Une chaîne de requête est une partie de l'URL utilisée pour passer des données ou des paramètres à un serveur web. Elle commence par un `?` et utilise `&` pour séparer les différentes paires clé-valeur.

Par exemple : `'?name=Theo&age=22'`. Ici, le nom est `Theo` et l'âge est `22`. Ces valeurs sont transmises via la chaîne de requête.

Les chaînes de requête sont souvent utilisées dans les applications web pour envoyer des données lors de requêtes `GET`.

### 🔰 Prise en main

Comme je l’ai décrit dans mon petit exemple au-dessus, je vais renvoyer sur ma page web deux variables : `username` et `age` dans la réponse à une requête avec une chaîne de requête *(Query String)*.

Je créé donc ma requête :

``` typescript
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  */

  @Get()
  getQueryStrings(
    @Query('name') username,
    @Query('age') age,
    ): string {
    return `${username}, ${age}`;
  }

  @Get('/askquestion')
  askQuestion() {
    return 'What is your name?'
  }

  @Post('/answer')
  answer(@Body() getAnswerDto: AnswerDto) {
    return getAnswerDto.answer
  }

  @Get(':id')
  getRouteParam(@Param('id') userId: string) {
    return `${userId}`
  }
}

```

Je teste dans ma `console réseau` ma requête `QueryString` avec `http://localhost :3000 ?name=Theo&age=22`:

![Image](https://github.com/user-attachments/assets/4503801a-ec8f-4333-bcfd-e3c485154fc3)

J’accède bien aux bonnes valeurs.
