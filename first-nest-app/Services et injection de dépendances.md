### [🔙 Retour au projet](https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/HOME.md)

# 📦 Services et injection de dépendances

## 📑 Table des matières

|<div align="left"><h4>🔙 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Gestion%20des%20requ%C3%AAtes%20et%20des%20r%C3%A9ponses.md">Pécédant *(Gestion des requêtes et des réponses)*</a></h3></div>|
|---|
|<div align="left"></div>|
|<div align="right"><h4>🔜 <a href="">Suivant</a></h4></div>|

# 🛠️ Création de services
## 📖 Définition

Les **services** dans **NestJS** sont responsables de l'encapsulation et de la fourniture de la logique métier, de la manipulation des données, et d'autres fonctionnalités requises par une application. Les services sont conçus pour être des composants réutilisables et maintenables qui peuvent être injectés dans des contrôleurs, d'autres services, ou des modules. Pour créer un service dans **NestJS**, on utilise généralement le décorateur `@Injectable()` pour définir une classe. À l'intérieur de la classe de service, on peut implémenter des méthodes et des fonctions qui exécutent des tâches ou des opérations spécifiques. Les services aident à garder le code organisé, à promouvoir la réutilisation du code, et à faciliter les tests.

## 🏗️ Structure du service

Dans le programme `/src/app.controllqer.ts` on retrouve la mention de **service**.

Si on regarde de plus près la méthode `getHello()`, on sait qu’elle est censé nous retourner `’Hello world!’` dans le corps de la page web.
Cependant, il n’est pas explicitement décrit ici de retourner une chaine de caractères.
Ici, la méthode retourne plutôt : `this.appService.getHello()`.

Ainsi, ce contrôleur retourne la réponse qu’il obtient à partir du service `appService` qui est importé en mode `readonly` *(Impossibilité de mettre à jour quoi que ce soit dans ce service)* depuis `AppService` :
``` typescript
import { Controller, Get, Post, Body, Param, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req, @Res() res) {
    console.log(res.headers);
    // return this.appService.getHello();
    res.status(200).json({
      res: this.appService.getHello()
    })
  }
[…]
```

Finalement, dans le fichier `/src/app.service.ts` nous retrouvons la définition de la méthode `getHello()` qui est exécutée depuis nôtre contrôleur :
``` typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

## 🚀 Mise en application

Comme un contrôleur peut avoir plusieurs services, je vais créer un nouveau service ainsi qu’un nouvel `endpoint`.

Dans cet endpoint, on **recevra 2 nombres depuis nos utilisateurs**.

A l’aide de mon nouveau service, j’en fournirais la **somme de ces 2 nombres**. Je vais donc l’appeler `sum-service`.

### 🆕 Création d’un nouveau service

Ce qui est bien avec NestJS, c’est que nous ne sommes pas contraints de créer les fichiers, importations/exportations, classes et méthodes à la main. Il est effectivement possible de réaliser cela à partir d’un terminal et d’une simple commande prédéfinie à cet effet : `nest generate service sum-service`.

#### ⚠️ Souci technique

Lors de l’exécution de la commande j’ai eu cette erreur :
```
PS C:\Users\t.avril\Documents\Stage-Technique\first-nest-app> nest generate service sum-service
nest : Impossible de charger le fichier C:\Users\t.avril\AppData\Roaming\npm\nest.ps1, car l’exécution de scripts est
désactivée sur ce système. Pour plus d’informations, consultez about_Execution_Policies à l’adresse
https://go.microsoft.com/fwlink/?LinkID=135170.
Au caractère Ligne:1 : 1
+ nest generate service sum-service
+ ~~~~
    + CategoryInfo          : Erreur de sécurité : (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

Apparemment, ma machine n’a pas les droits pour exécuter des scripts.
Il me faut donc :
-	Vérifier les permissions de mon système
-	Accorder l’autorisation d’exécution des scripts téléchargés sur internet (mais signés)

Dans le `PowerShell` je vérifie les autorisations avec la commande `Get-ExecutionPolicy`. Cela me retourne : `Restricted`.

Je modifie donc l’autorisation en *RemoteSigned* ce qui autorise les scripts créés sur la machine de s’exécuter à condition également que les scripts téléchargés sur internet soient signés par un auteur reconnu avec la commande : `Set-executionPolicy RemoteSigned`.

Je peux maintenant exécuter ma commande initiale pour créer mon service :

```
PS C:\Users\t.avril\Documents\Stage-Technique\first-nest-app> nest generate service sum-service
CREATE src/sum-service/sum-service.service.ts (98 bytes)
CREATE src/sum-service/sum-service.service.spec.ts (507 bytes)
UPDATE src/app.module.ts (349 bytes)
```

On voit donc que deux fichiers ont été créés dans un nouveau dossier `/src/sum-service` et que le fichier des modules a été mis à jour correctement.

#### 📝 Définition du service

Dans le fichier `/src/sum-service/sum-service.service.ts`, je définis la méthode `getSum(a, b)` qui prendra en paramètre les 2 nombres des utilisateurs et qui retournera leur somme :
``` typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class SumServiceService {
    getSum(a, b) {
        return a + b;
    }
}
```

J’utiliserai ce service depuis l’application **contrôleur**.
Il me faut donc importer et définir mon nouveau service dans le constructeur :
``` typescript
import { Controller, Get, Post, Body, Param, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerDto } from './dto/app.dto';
import { SumServiceService } from './sum-service/sum-service.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sumService: SumServiceService,
  ) {}
[…]
```
À présent, il faut gérer l’acquisition de mes paramètres *(les 2 nombres donnés par les utilisateurs)*.

On pourra accéder à ces paramètres à l’endpoint `’/sum’` *(donc à l’adresse `localhost:3000/sum`)*.

Je créé une nouvelle requête d’acquisition :
``` typescript
  @Get('/sum')
  getSum(@Query('a') a, @Query('b') b) {
    return this.sumService.getSum(a, b);
  }
```

Afin d’accéder aux paramètres, j’ajoute à la méthode `getSum()` des paramètres de requête `@Query`.
J’accèderai ainsi au `nb1` que je nommerai `a` et au `nb2` nommé associé à la variable `b`.

Je retourne finalement la réponse de la méthode `getSum` du service `sumService`.

### 🧪 Test du service

J’exécute l’application web NestJS avec la commande : `npm run start:dev`.

Dans ma `console réseau`, je me rends sur `localhost:3000/sum` et fais une requête `GET`. Ensuite, je passe mes paramètres directement dans l’URL. Ce qui nous donne : `GET http://localhost:3000/sum?num1=10&num2=4`.

J’obtiens ainsi :

![image](https://github.com/user-attachments/assets/48809d8c-9848-46c9-9736-0c64e1175194)


Il s’agit d’une erreur car j’essaie d’additionner dans caractères. Il faut que je précise qu’il s’agit d’entiers. Je modifie donc mon programme `/src/sum-service/sum-service.service.ts` en conséquence :
``` typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class SumServiceService {
    getSum(nb1: number, nb2: number): number {
        return nb1 + nb2;
    }
}
```

Et surtout, le programme `/src/app.controller.ts` :
``` typescript
  @Get('sum')
  getSum(@Query('num1') a: string, @Query('num2') b: string): number | string {
    const nb1 = Number(a);
    const nb2 = Number(b);  
    return this.sumService.getSum(nb1, nb2);
  }
```

---
> Remarque :
> Il m’a fallut plusieurs essais avant de trouver pourquoi la somme n’était pas possible.
> Initialement j’essayais de faire des `parseInt()` dans le programme `/src/sum-service/sum-service.service.ts` mais j’ai vite remarqué que le problème devait pour une raison ou une autre être adressé avant l’appel au service : pendant l’acquisition des valeurs dans le programme `/src/app.controller.ts` avec la méthode `Number` qui est plus efficace que `parseInt()`.
---

Maintenant, j’obtiens bien le bon résultat :

![image](https://github.com/user-attachments/assets/a2ad3aab-8f84-4320-843f-0eabf985c2d8)
![image](https://github.com/user-attachments/assets/7607188c-c914-486a-b014-0eada8b24c06)
