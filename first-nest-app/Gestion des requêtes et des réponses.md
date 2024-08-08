### [⤴️ Retour au projet](https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/HOME.md)

# 🔄 Gestion des requêtes et des réponses

## 📑 Table des matières

|<div align="left"><h4>🔙 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Controlleurs%20et%20routage.md">Précédant *(Controlleurs et routage)*</a></h4></div>|
|---|
|<div align="left"><ul><li><h3>📖 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Gestion%20des%20requ%C3%AAtes%20et%20des%20r%C3%A9ponses.md#-d%C3%A9finition-1">Définition</a></h3></li><li><h3>🛠️ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Gestion%20des%20requ%C3%AAtes%20et%20des%20r%C3%A9ponses.md#%EF%B8%8F-impl%C3%A9mentation-et-usage-1">Implémentation et usage</a></h3></li><li><h3>🧪 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Gestion%20des%20requ%C3%AAtes%20et%20des%20r%C3%A9ponses.md#-tests-1">Tests</a></h3></li><ul><li><h4>📤 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Gestion%20des%20requ%C3%AAtes%20et%20des%20r%C3%A9ponses.md#-test-de-requ%C3%AAtes-1">Test de requêtes</a></h4></li><li><h4>📥 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Gestion%20des%20requ%C3%AAtes%20et%20des%20r%C3%A9ponses.md#-test-de-r%C3%A9ponses-1">Test de réponses</a></h3></li></ul><li><h3>🔌 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Gestion%20des%20requ%C3%AAtes%20et%20des%20r%C3%A9ponses.md#-exemple-avec-une-api-1">Exemple avec une API</a></h3>|
|<div align="right"><h4>🔜 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md">Suivant *(Services et injection de dépendances)*</a></h4></li></ul></div>|



## 📖 Définition
Les requêtes et les réponses sont des objets utilisés pour interagir avec les données de requêtes entrantes et préparer les données de réponse que l’application NestJS renvoie au client.
Tout simplement : 
``` mermaid
flowchart LR
    Client-- Requête -->Serveur
    Serveur-- Réponse -->Client
```

Les **contrôleurs** dans **NestJS** sont responsables de la gestion des requêtes HTTP entrantes et de la génération de réponses appropriées. On définit des méthodes au sein des contrôleurs pour gérer des routes spécifiques, et ces méthodes prennent en charge les requêtes HTTP et renvoient des réponses HTTP. Au sein de ces méthodes, on peut accéder aux données de la requête, telles que les paramètres de route et les chaînes de requête, en utilisant des décorateurs comme `@Param()` et `@Query()`. On peut également utiliser les décorateurs `@Req()` et `@Res()` pour accéder directement aux objets de requête et de réponse d'**Express.js** *(Etude détaillée d'Express.js peut-être plus tard...)*, si nécessaire. Pour envoyer des réponses, on retourne généralement des données à partir de nos méthodes de gestion des routes, et NestJS se charge de les sérialiser dans le format de réponse approprié (par exemple, JSON).


## 🛠️ Implémentation et usage

Voyons comment je peux gérer les requêtes et les réponses dans le contrôleur actuel :

-	Premièrement, j’implémente à nouveau la méthode `getHello()`, qui pour n’importe quelle requête renvoie `’Hello World !’`.
-	Afin de gérer les requêtes et réponses de la méthode, j’ajoute en paramètre : `getHello(@Req req, @Res res)`.

``` typescript
import { Controller, Get, Post, Body, Param, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req, @Res() res): string {
    console.log(res.headers);
    return this.appService.getHello();
  }

  /*
  @Get()
  getQueryStrings(
    @Query('name') username,
    @Query('age') age,
    ): string {
    return `${username}, ${age}`;
  }
  */

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

Ici, toutes les fonctionnalités de `@Req` seront assignées au paramètre `req` que j’ai créé pour la gestion des requêtes. De même pour les réponses où les fonctionnalités de `@Res` seront assignées au paramètre `res`.

C’est grâce à `req` et `res` que l’on va être capables de gérer les requêtes et les réponses.

L’intérêt de gérer les requêtes et réponses est multiple.
Dans la plupart des cas, cela nous permet d’obtenir des paramètres de `QueryStrings`, obtenir les paramètres des routes, obtenir le corps, etc.
On pourrait également utiliser les requêtes pour réaliser un système d’authentification. Car le paramètre `req` peut nous donner accès à la requête complète envoyée au serveur par le client.
La réponse peut nous permettre de contrôler plus habilement les données que l’on souhaite retourner au client.

## 🧪 Tests

### 📤 Test de requêtes

Afin de voir comment se comportent les requêtes et les réponses, je vais observer la valeur du paramètre `req` avec un `console.log(req.headers)` .
Voici ce que j’obtiens dans la console :
``` typescript
{
  host: 'localhost:3000',
  connection: 'keep-alive',
  'sec-ch-ua': '"Not)A;Brand";v="99", "Microsoft Edge";v="127", "Chromium";v="127"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'sec-fetch-site': 'none',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-user': '?1',
  'sec-fetch-dest': 'document',
  'accept-encoding': 'gzip, deflate, br, zstd',
  'accept-language': 'fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  cookie: 'wordpress_test_cookie=WP%20Cookie%20check; wordpress_logged_in_86a9106ae65537651a8e456835b316ab=wordpress%7C1721374231%7C72rSkxZU0uDFl5A97ImU5EF4LXL2Rksjkiib4Gd2EHR%7C81b616e2cbee7d0e84b093286d842ef8d62ab559b134076743ff9f541e77460c; wp-settings-time-1=1721201432; adminer_sid=t15jacnot7can3nii8i62jirc0; adminer_key=50dc48495092c1375aaf4b480468d1af; PHPSESSID=5395cb2fbdd22c9ddae6c350cde6b12a; sf_redirect=%7B%22token%22%3A%22d086da%22%2C%22route%22%3A%22index%22%2C%22method%22%3A%22GET%22%2C%22controller%22%3A%7B%22class%22%3A%22App%5C%5CController%5C%5CDefaultController%22%2C%22method%22%3A%22index%22%2C%22file%22%3A%22%5C%2Fopt%5C%2Fepack%5C%2Fbackofficemanagerv4%5C%2Fsrc%5C%2FController%5C%2FDefaultController.php%22%2C%22line%22%3A30%7D%2C%22status_code%22%3A302%2C%22status_text%22%3A%22Found%22%7D; Phpstorm-92ba6cdd=d9ca7625-7f5d-4e30-8152-243dd36d043b',
  'if-none-match': 'W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"'
}
```

J’ai donc accès aux données de mon utilisateur.

### 📥 Test de réponses

Au lieu de retourner directement `’Hello World !’`, je souhaite le retourner en tant que réponse.

Pour ce faire, je vais retourner un fichier JSON contenant l’affectation de `’Hello World !’` à `res` :

``` typescript
  @Get()
  getHello(@Req() req, @Res() res) {
    console.log(res.headers);
    // return this.appService.getHello();
    res.status(200).json({
      res: this.appService.getHello()
    })
  }
```

Ainsi, en allant sur ma page web, je reçois bien :

![image](https://github.com/user-attachments/assets/181ec9c5-f512-4295-916a-2835ec45e0e8)

On pourrait bien sur aller plus loin dans la démarche, cela pourrait être utile pour les API.

## 🔌 Exemple avec une API

Comme vu tout à l’heure avec la méthode `getHello()`, on pourrait utiliser les réponses d’une manière similaire pour une API où on souhaiterai envoyer la réponse sous quelques conditions.

Considérons que notre API est la requête `@Post(‘/answer’)`.
Disons que l’on souhaite obtenir la réponse associée à `’yes’` ou `’no’`. 

-	Si la valeur de `answer` est `’yes’`, on revoie `’It is yes’`.
-	Sinon, on renvoie `’It is no’` avec une mauvaise requête 400.

Avant de renvoyer quoi que ce soit, je souhaite observer ce que l’on obtient. Dépendamment de la valeur de `’answer’`, j’obtiendrais une réponse. J’ajoute donc `let response`. Je souhaite également observer le statut `let status`.

Je renverrais la réponse sous forme JSON.

Voici le programme :
``` typescript
  @Post('/answer')
  answer(@Body() getAnswerDto: AnswerDto,
    @Req() req,
    @Res() res) {
      let response;
      let status;
      if (getAnswerDto.answer === 'yes') {
        response = 'It is yes',
        status = 200
      } else {
        response = 'It is no',
        status = 400
      }
    res.status(status).json({
      res: response
    })
  }
```

Et voici ce que j’obtiens en mettant `’yes’` comme valeur de `answer` dans le corps de ma requête `@Post` à l’endpoint *(point de montage)* `/answer`:

![image](https://github.com/user-attachments/assets/54d076f5-cd7e-4315-9651-71fbb64a9feb)

Et si je mets `’no’` ou toute autre valeur à `answer`, j’obtiens :

![image](https://github.com/user-attachments/assets/b2d0c281-d79a-43af-b917-d87535373a99)

Ainsi que l’erreur 400 :

![image](https://github.com/user-attachments/assets/877e85d8-0d7e-4055-8713-ffcfc91f378d)
