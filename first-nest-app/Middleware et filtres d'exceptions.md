### [⤴️ Retour au projet](https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/HOME.md)

# 🛡️ Middleware et filtres d'exceptions

## 📑 Table des matières

|<div align="left"><h4>🔙 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md">Précédant *(Services et injection de dépendances)*</a></h4></div>|
|---|
|<div align="left"><h2>🚧 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-les-middlewares-2">Les Middlewares</a></h2><ul><li><h3>📖 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-d%C3%A9finition-2">Définition</a></h3></li><li><h3>🔰 <a href ="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-prise-en-main-2">Prise en main</a></h3></li><ul><li><h4>🆕 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-cr%C3%A9ation-du-middleware-1">Création du middleware</a></h4></li><li><h4>🔧 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-impl%C3%A9mentation-du-middleware-1">Implémentation du middleware</a></h4></li></ul><li><h3>🧪 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-tests-dauthentification-1">Tests d’authentification</a></h3></li><ul><li><h4>🚫 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-sans-cl%C3%A9">Sans clé</a></h4></li><li><h4>🔑 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-avec-cl%C3%A9">Avec clé</a></h4></li><ul><li><h5>❌ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-cl%C3%A9-erron%C3%A9e-ou-non-fournie">Clé erronée ou non fournie</a></h5></li><li><h5>✔️ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#%EF%B8%8F-cl%C3%A9-correcte">Clé correcte</a></h5></li></ul></ul></ul></div>|
|<div align="left"><h2>🛡️ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#%EF%B8%8F-filtres-dexception">Filtres d’exception</a></h2><ul><li><h3>📖 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-d%C3%A9finition-1">Définition</a></h3></li><li><h3>🔰 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-prise-en-main-3">Prise en main</a></h3></li><ul><li><h4>🔧 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-impl%C3%A9mentation">Implémentation</a></h4></li></ul><li><h3>🧪 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Middleware%20et%20filtres%20d'exceptions.md#-test">Test</a></h3></li></ul></div>|

# 🚧 Les Middlewares

## 📖 Définition

Le **middleware** dans **NestJS** est un concept emprunté au framework **Express.js**. Il représente des fonctions ou des classes qui sont exécutées avant que la requête n'atteigne le gestionnaire de route dans l’application. Le middleware peut être utilisé pour diverses finalités, telles que la journalisation, l'authentification, l'analyse des requêtes, et plus encore. **NestJS** fournit des middlewares intégrés, mais on peut également créer des middlewares personnalisés pour répondre à des besoins spécifiques. Les fonctions de middleware ont accès aux objets de requête et de réponse, ce qui permet de modifier ou d'inspecter la requête avant qu'elle n'atteigne le contrôleur.

## 🔰 Prise en main

Je vais créer un middleware qui me permettra de savoir si un code d’autorisation est présent dans une requête header ou non.

### 🆕 Création du middleware
Je créé le nouveau dossier : `/src/middleware/` où je vais stocker mon 1er middleware que je nomme : `authcheck.middleware.ts` :
``` typescript
import {NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

export class AuthcheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers);
    next();
  }
}
```
Ici, le middleware a besoin d’utiliser certaines valeurs : recevoir la requête, la réponse et la `next function`. Pour le moment, je souhaite simplement observer ce qu’il se passe avant d’implémenter quoi que ce soit de plus. Je fais donc un console.log qui me renvoie la requête obtenue dans le header. Je dois aussi ajouter l’appel à la fonction `next()` afin qu’il puisse aller à la prochaine requête *(ou fonction définie après le middleware)*.

### 🔧 Implémentation du middleware
Le middleware doit être exporté et configuré dans le fichier : `/src/app.module.ts`.
Pour commencer, j'ai implémenté l'interface NestModule dans la classe AppModule. Cela m'a permis d'utiliser la méthode configure() pour configurer mon middleware.

Ensuite, dans la méthode configure(), j'ai utilisé l'objet MiddlewareConsumer pour appliquer le middleware. J'ai spécifié que AuthcheckMiddleware doit être appliqué à toutes les routes de l'application, en utilisant path: '*' pour couvrir toutes les URL, et method: RequestMethod.ALL pour inclure toutes les méthodes HTTP (GET, POST, etc.).

Voici donc le code mis à jour :
``` typescript
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthcheckMiddleware).forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
```
## 🧪 Tests d’authentification

### 🚫 Sans clé

En allant dans ma console réseau, je fais une POST request vers `localhost:3000/sayname` et je peux voir dans le terminal qu’on obtient bien toutes les informations relatives à la requête :
```
{
  host: 'localhost:3000',
  connection: 'keep-alive',
  'content-length': '25',
  'sec-ch-ua': '"Not)A;Brand";v="99", "Microsoft Edge";v="127", "Chromium";v="127"',
  'content-type': 'application/json',
  'sec-ch-ua-mobile': '?0',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
  'sec-ch-ua-platform': '"Windows"',
  accept: '*/*',
  origin: 'http://localhost:3000',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  'accept-encoding': 'gzip, deflate, br, zstd',
  'accept-language': 'fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  cookie: 'wordpress_test_cookie=WP%20Cookie%20check; wordpress_logged_in_86a9106ae65537651a8e456835b316ab=wordpress%7C1721374231%7C72rSkxZU0uDFl5A97ImU5EF4LXL2Rksjkiib4Gd2EHR%7C81b616e2cbee7d0e84b093286d842ef8d62ab559b134076743ff9f541e77460c; wp-settings-time-1=1721201432; adminer_sid=t15jacnot7can3nii8i62jirc0; adminer_key=50dc48495092c1375aaf4b480468d1af; PHPSESSID=5395cb2fbdd22c9ddae6c350cde6b12a; sf_redirect=%7B%22token%22%3A%22d086da%22%2C%22route%22%3A%22index%22%2C%22method%22%3A%22GET%22%2C%22controller%22%3A%7B%22class%22%3A%22App%5C%5CController%5C%5CDefaultController%22%2C%22method%22%3A%22index%22%2C%22file%22%3A%22%5C%2Fopt%5C%2Fepack%5C%2Fbackofficemanagerv4%5C%2Fsrc%5C%2FController%5C%2FDefaultController.php%22%2C%22line%22%3A30%7D%2C%22status_code%22%3A302%2C%22status_text%22%3A%22Found%22%7D; Phpstorm-92ba6cdd=d9ca7625-7f5d-4e30-8152-243dd36d043b'
}
```

### 🔑 Avec clé

Maintenant, si je fais la même requête POST mais cette fois-ci avec un header particulier, je souhaite donner l’accès ou non à l’utilisateur.

Si l’utilisateur possède le header `authorization` et que sa valeur est `g le droit`, alors on passe à la fonction suivante *(qui doit renvoyer le nom)*. Sinon, je reçois l’erreur 403 avec un message `Access forbidden`.

Voici le programme `src/middleware/authcheck.middleware.ts` mis à jour :
``` typescript
import {NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

export class AuthcheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        if(req.headers['authorization'] === 'g le droit'){
            next();
        } else {
            res.status(403).send('Access forbidden');
        }
    }
}
```

#### ❌ Clé erronée ou non fournie

J’effectue la même requête que tout à l’heure mais sans mentionner le header `authorization` :

![image](https://github.com/user-attachments/assets/bc473ed7-22a1-4b8f-aa3a-dc774cc4fab0)

> *J’obtiens la même chose avec une valeur erronée.*

#### ✔️ Clé correcte

Cette fois-ci avec la bonne valeur de header :

![image](https://github.com/user-attachments/assets/c1b598f8-3311-4cd6-a2b3-0b832cf90e22)

---

# 🛡️ Filtres d’exception

## 📖 Définition

Les **filtres d'exceptions** dans **NestJS** sont utilisés pour gérer les exceptions qui surviennent lors du traitement d'une requête entrante. Lorsqu'une exception est levée au sein d'un gestionnaire de route ou d'un middleware, le système de gestion des exceptions de **NestJS** peut être configuré pour transmettre l'exception à un filtre d'exception approprié pour qu'elle soit traitée. Les filtres d'exceptions sont responsables de la mise en forme des réponses d'erreur, de la journalisation des erreurs et, éventuellement, de la fourniture de messages d'erreur personnalisés ou d'un comportement spécifique. On peut créer des filtres d'exceptions personnalisés pour gérer des types spécifiques d'exceptions ou d'erreurs dans une application.

Il existe beaucoup d’exceptions http. La plupart d’entres elles sont prédéfinies dans la *[documentation officielle de NestJS](https://docs.nestjs.com/exception-filters)* :
> - `BadRequestException`
> - `UnauthorizedException`
> - `NotFoundException`
> - `ForbiddenException`
> - `NotAcceptableException`
> - `RequestTimeoutException`
> - `ConflictException`
> - `GoneException`
> - `HttpVersionNotSupportedException`
> - `PayloadTooLargeException`
> - `UnsupportedMediaTypeException`
> - `UnprocessableEntityException`
> - `InternalServerErrorException`
> - `NotImplementedException`
> - `ImATeapotException`
> - `MethodNotAllowedException`
> - `BadGatewayException`
> - `ServiceUnavailableException`
> - `GatewayTimeoutException`
> - `PreconditionFailedException`

Voici la synthaxe générale :
``` typescript
@Get()
async findAll() {
  throw new ForbiddenException();
}
```

## 🔰 Prise en main
Lors de la section précédente, j’ai utilisé un système simple d’authentification avec un middleware. Ici, dans le cas où l’utilisateur ne fourni pas le bon header, on pourrait utiliser une exception prédéfinie plutôt que de renvoyer un simple code 403 avec message customisé.

En cherchant dans la documentation de NestJS, une exception existe pour ce cas particulier, elle s’appelle `UnauthorizedException`.

### 🔧 Implémentation
J’ajoute l’exception dans le programme : `/src/middleware/authcheck.middleware.ts` :
``` typescript
import {NestMiddleware, UnauthorizedException} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

export class AuthcheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        if(req.headers['authorization'] === 'g le droit'){
            next();
        } else {
            //res.status(403).send('Access forbidden');
            throw new UnauthorizedException('Access forbidden');
        }
    }
}
```

## 🧪 Test

J’envoie une requête POST avec un mauvais header :

![image](https://github.com/user-attachments/assets/8a348ccb-c100-4b74-b362-e262fee8b113)
