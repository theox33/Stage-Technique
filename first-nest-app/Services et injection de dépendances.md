### [⤴️ Retour au projet](https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/HOME.md)

# 📦 Services et injection de dépendances

## 📑 Table des matières

|<div align="left"><h4>🔙 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Gestion%20des%20requ%C3%AAtes%20et%20des%20r%C3%A9ponses.md">Pécédant *(Gestion des requêtes et des réponses)*</a></h3></div>|
|---|
|<div align="left"><h2>🛠️ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#%EF%B8%8F-cr%C3%A9ation-de-services-1">Création de services</a></h2><ul><li><h3>📖 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-d%C3%A9finition-1">Définition</a></h3></li><li><h3>🏗️ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#%EF%B8%8F-structure-du-service-1">Structure du service</a></h3></li><li><h3>🚀 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-mise-en-application-1">Mise en application</a></h3></li><ul><li><h4>🆕 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-cr%C3%A9ation-dun-nouveau-service-1">Création d'un nouveau service</a></h4></li><ul><li><h5>⚠️ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#%EF%B8%8F-souci-technique-1">Souci technique</a></h5></li><li><h5>📝 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-d%C3%A9finition-du-service-1">Définition du service</a></h5></li></ul><li><h4>🧪 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-test-du-service-1">Test du service</a></h4></li></ul></ul></div>|
|<div align="left"><h2>🔌 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-utilisation-des-providers-1">Utilisation des providers</a></h2><ul><li><h3>📖 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#--d%C3%A9finition-de-provider">Définition de `provider`</a></h3></li><li><h3>💉 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-linjection-1">L'injection</a></h3></li><ul><li><h4>❓ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-questionnement-1">Questionnement</a></h4></li></ul></ul></div>|
|<div align="left"><h2>🗂️ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#%EF%B8%8F-modules-et-port%C3%A9es-des-services-1">Modules et portées des services</a></h2><ul><li><h3>📖 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-d%C3%A9finition-des-modules-1">Définition des modules</a></h3></li><li><h3>🏗️ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#%EF%B8%8F-cr%C3%A9ation-de-nouvelles-entit%C3%A9s-1">Création de nouvelles entités</a></h3></li><ul><li><h4>🆕 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-cr%C3%A9ation-dun-module-1">Création d'un module</a></h4></li><li><h4>🕹️ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#%EF%B8%8F-cr%C3%A9ation-dun-contr%C3%B4leur-1">Création d'un contrôleur</a></h4></li><li><h4>🔧 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-cr%C3%A9ation-dun-service-1">Création d'un service</a></h4></li><li><h4>📄 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-cr%C3%A9ation-dun-dto-1">Création d'un DTO</a></h4></li></ul><li><h3>💻 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-programmation-des-entit%C3%A9s-1">Programmation des entités</a></h3></li><ul><li><h4>🕹️ <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#%EF%B8%8F-le-contr%C3%B4leur-1">Le contrôleur</a></h4></li></ul><li><h3>🧪 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-test-1">Test</a></h3></li><ul><li><h4>🚫 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-sans-service-1">Sans service</a></h4></li><li><h4>🔄 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md#-modifications-avec-service-1">Modifications avec service</a></h4></li></ul></ul></div>|
|<div align="right"><h4>🔜 <a href="https://github.com/theox33/Stage-Technique/blob/main/first-nest-app/Services%20et%20injection%20de%20d%C3%A9pendances.md">Suivant</a></h4>|

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
> Il m’a fallu plusieurs essais avant de trouver pourquoi la somme n’était pas possible.
> Initialement j’essayais de faire des `parseInt()` dans le programme `/src/sum-service/sum-service.service.ts` mais j’ai vite remarqué que le problème devait pour une raison ou une autre être adressé avant l’appel au service : pendant l’acquisition des valeurs dans le programme `/src/app.controller.ts` avec la méthode `Number` qui est plus efficace que `parseInt()`.
---



Maintenant, j’obtiens bien le bon résultat :

![image](https://github.com/user-attachments/assets/a2ad3aab-8f84-4320-843f-0eabf985c2d8)
![image](https://github.com/user-attachments/assets/7607188c-c914-486a-b014-0eada8b24c06)

---

# 🔌 Utilisation des providers

## 📖  Définition de `provider`

Dans **NestJS**, les services sont considérés comme des **fournisseurs** *(providers)*. Un fournisseur est une classe ou une valeur que **NestJS** peut injecter dans d'autres composants, tels que les contrôleurs ou d'autres services, en utilisant l'injection de dépendances.

Les fournisseurs peuvent être des singletons *( = un patron de conception dont l'objet est de restreindre l'instanciation d'une classe à un seul objet (ou bien à quelques objets seulement). Il est utilisé lorsque l'on a besoin d'exactement un objet pour coordonner des opérations dans un système.)* ou être limités à un module spécifique, selon la manière dont ils sont configurés.

Pour faire d'une classe un fournisseur, on la décore avec le décorateur `@Injectable()`. Une fois qu'une classe est marquée comme fournisseur, elle peut être injectée dans d'autres composants en spécifiant son type dans le constructeur du composant qui en a besoin. Le système d'injection de dépendances de **NestJS** se charge de créer et de gérer les instances des fournisseurs.

---

C’est là que se pose une problématique : tout à l’heure, j’ai implémenté un nouveau service défini dans `/src/sum-service/sum-service.service.ts`. Dans ce programme, j’ai identifié le service par le décorateur `@Injectable` et ai dit que cela servait à identifier les services. Or, ici je dis également que ce dernier sert à identifier les providers *(fournisseurs)*.

En réalité, les **services** sont un cas de **providers**.

Comme je l’ai expliqué dans la section *Définition*, les `providers` sont utilisés pour l’injection de dépendances. Mais en quoi cela consiste-t-il ?

>J’ai pu comprendre cela grâce à un commentaire sur StackOverflow avec une métaphore : 
>
>Imaginons que je souhaite manger une pizza. J’ai 2 options :
> - Je peux la cuisiner moi-même
> - Je peux la commander à un magasin
>
>Donc les `providers` m’apportent la dépendance ; Dans notre cas : les `providers` me fournissent >la pizza.

D’une manière similaire, j’ai créé le service `SumServiceService` et ensuite, je dis que ce service est un provider et qu’on peut l’injecter :
``` typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class SumServiceService {
    getSum(nb1: number, nb2: number): number {
        return nb1 + nb2;
    }
}

```

Mais en quoi consiste l’injection également ?

## 💉 L’injection

En reprenant comme base la portion de code ci-dessus ; Si je me rends dans le **module** `/src/app.module.ts`, on peut voir que sous l’indicateur `@Module`, sont présents les `contrôleurs` et les `providers` :
``` typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SumServiceService } from './sum-service/sum-service.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SumServiceService],
})
export class AppModule {}

```

Les deux `providers` : *AppService* et *SumServiceService* sont ceux utilisés dans le contrôleur `AppController`.

### ❓ Questionnement

Quand j’ai voulu prendre en main les services avec le contrôleur, les importations et exportations se faisaient dans les deux programmes : `/src/app.controller.ts` et `/src/sum-service/sum-service.service.ts`.

On peut donc se demander à quoi cela peut bien servir de déclarer le(s) contrôleur(s) et provider(s) dans le programme `/src/app.module.ts` alors que celui-ci n’est pas réellement utilisé dans ce cas précis.

J’ai donc décidé de supprimer le provider `SumServiceService` du programme `/src/app.module.ts` et voir comment l’application web se porte :
``` typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { SumServiceService } from './sum-service/sum-service.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

J’obtiens un message d’erreur dans mon terminal après avoir relancé NestJS :
``` typescript
[Nest] 86592  - 07/08/2024 16:24:43   ERROR [ExceptionHandler] Nest can't resolve dependencies of the AppController (AppService, ?). Please make sure that the argument SumServiceService at index [1] is available in the AppModule context.

Potential solutions:
- Is AppModule a valid NestJS module?
- If SumServiceService is a provider, is it part of the current AppModule?
- If SumServiceService is exported from a separate @Module, is that module imported within AppModule?
  @Module({
    imports: [ /* the Module containing SumServiceService */ ]
  })
```

L’erreur dit que `SumServiceService` devrait être disponible, mais pourquoi ?
Elle propose aussi plusieurs solutions :
-	Ce n’est pas un module valide *(Mais ce n’est pas notre cas, il est bien valide)*
-	S’il est un provider, il devrait faire partie de `AppModule`

Donc concrètement, à chaque fois que je souhaite créer un provider, ou un service *(puisqu’ils sont par défauts eux-mêmes des providers)* et que je l’utilise dans un contrôleur, alors il devrait faire partie du module auquel ce contrôleur est attaché.

Tout cela appartient au même module.

Je verrais ensuite en quoi consiste un module car l’explication n’est pas satisfaisante *pour le moment*.

---

# 🗂️ Modules et portées des services

## 📖 Définition des modules

Les **modules** sont un concept fondamental dans **NestJS** qui permettent d'organiser une application en unités logiques. Les modules regroupent des composants connexes, y compris des contrôleurs, des services et d'autres fournisseurs, ensemble. Un aspect important des modules est qu'ils définissent la portée des fournisseurs. Dans **NestJS**, les fournisseurs peuvent avoir différentes portées, notamment :

- **Singleton** : Un fournisseur singleton est créé une seule fois et est partagé dans toute l'application. Il reste le même tout au long du cycle de vie de l'application.
- **Portée de la requête** : Un fournisseur à portée de requête est créé pour chaque requête HTTP entrante et est détruit à la fin de la requête. Cela est utile pour stocker des données spécifiques à la requête.
- **Portée du module** : Un fournisseur à portée de module est créé une fois par module et est partagé au sein de ce module. Il peut être utilisé pour partager l'état et les fonctionnalités entre les composants d'un module.
La portée des modules peut être représentée de cette manière :
``` mermaid
---
Title : Portée des modules
---
flowchart TD
	A[App Module] --> B[1er Module]
	A --> C[2nd Module]
	C --> D[3e Module]
	C --> E[4e Module]
```

Dans NestJS, il y a toujours un module `root` *(racine)* qui est désigné par `App Module`. Ce dernier possède des connections à d’autres modules en cas de besoin.
Donc ce modèle d’application ci-dessus peut être dépendant du 1er module et du 2dn module pour du traitement de la donnée ou effectuer des calculs. On peut alors placer cela dans une arborescence.

Dans un second temps, le 4e module et le 3e module sont dépendants du 2e module.

Les modules suivent toujours cette structure dite *en T*.

C’est également valable pour les contrôleurs et les services.

On peut partager ces modules, services et contrôleurs entre eux.

## 🏗️ Création de nouvelles entités

### 🆕 Création d’un module
Je vais à présent créer un tout nouveau module, puis j’y ajouterai des contrôleurs et des services. Je créerai ensuite une API que j’appellerai pour qu’elle retourne le nom que lui fournirai.

De la même manière que pour la création de service, il existe une manière automatisée dans NestJS de créer un nouveau module avec un terminal.

Je créé le module `’sayname’` avec la commande : `nest generate module sayname`.

Il y a un nouveau dossier avec un fichier créé : `sayname/sayname.module.ts` que voici :
```typescript
import { Module } from '@nestjs/common';

@Module({})
export class SaynameModule {}
```
De plus, le fichier `app.module.ts` est mis à jour automatiquement avec notamment l’importation du nouveau module créé :
```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SumServiceService } from './sum-service/sum-service.service';
import { SaynameModule } from './sayname/sayname.module';

@Module({
  imports: [SaynameModule],
  controllers: [AppController],
  providers: [AppService, SumServiceService],
})
export class AppModule {}

```

### 🕹️ Création d’un contrôleur

À présent, je vais créer un nouveau contrôleur spécialement pour mon module `sayname` avec la commande : `nest generate controller sayname`.

Voici les modifications apportées par l’exécution de cette commande :
-	Création de `src/sayname/sayname.controller.ts`
-	Création de `src/sayname/sayname.controller.spec.ts`
-	Modification de `src/sayname/sayname.module.ts`

Dans ce dernier fichier modifié *(`src/sayname/sayname.module.ts`)*, on voit que le nouveau module `sayname` a automatiquement importé le nouveau contrôleur du même nom :
``` typescript
import { Module } from '@nestjs/common';
import { SaynameController } from './sayname.controller';

@Module({
  controllers: [SaynameController]
})
export class SaynameModule {}

```

Le fichier `src/sayname/sayname.controller.spec.ts` quant à lui, est un fichier de test du contrôleur `src/sayname/sayname.controller.ts`.

Voici le nouveau contrôleur `src/sayname/sayname.controller.ts` :
``` typescript
import { Controller } from '@nestjs/common';

@Controller('sayname')
export class SaynameController {}

```

### 🔧 Création d’un service

J’utilise à nouveau la commande pour créer un nouveau service que je vais nommer `sayname` également : `nest generate service sayname`.

On peut voir que le fichier `src/sayname/sayname.module.ts` a été mis à jour avec l’importation du nouveau service :
``` typescript
import { Module } from '@nestjs/common';
import { SaynameController } from './sayname.controller';
import { SaynameService } from './sayname.service';

@Module({
  controllers: [SaynameController],
  providers: [SaynameService]
})
export class SaynameModule {}

```

### 📄 Création d’un DTO

Je créé un DTO qui prendra le nom sur le corps de la page que je nomme `/src/dto/sayname.dto.ts` :
``` typescript
export class SaynameDto {
    name
}
```

## 💻 Programmation des entités
### 🕹️ Le contrôleur

Je souhaite créer une requête `@Post` dans mon contrôleur `/src/sayname/sayname.controller.ts` avec une méthode `sayMyName()` qui prendra en paramètre le contenu du corps de la page web à l’endpoint `sayname` stocké dans le DTO `SaynameDto` :
``` typescript
import { Body, Controller, Post } from '@nestjs/common';
import { SaynameDto } from 'src/dto/sayname.dto';

@Controller('sayname')
export class SaynameController {
    @Post()
    sayMyName(@Body() name: SaynameDto) {
        return `Your name is ${name.name}`;
    }
}


```

> ***Remarque :** il est nécessaire d’écrire `name.name` car la méthode renvoie un objet `name` avec l’attribut `name`.*

## 🧪 Test
### 🚫 Sans service
J’exécute l’application web NestJS avec la commande : `npm run start:dev`.

Dans ma `console réseau`, je me rends sur `localhost:3000/sayname` et fais une requête `POST`. Ensuite, je passe mes paramètres directement dans l’URL. Ce qui nous donne : `POST  http://localhost:3000/sayname`.

J’obtiens ainsi :

![image](https://github.com/user-attachments/assets/df1caaab-affc-4591-ae56-14ec214560f1)

Et donc, si je donne une valeur à `name` :

![image](https://github.com/user-attachments/assets/7b820141-bd49-4fdc-9073-a3222fcfec5a)

Cependant, je n’ai pas utilisé de service pour parvenir à ce résultat, je vais donc modifier quelques lignes afin de passer par ce dernier.

### 🔄 Modifications avec service

C’est cette fois-ci le service qui va renvoyer la réponse. J’implémente donc de manière similaire la requête `@Post` du fichier `/src/sayname/sayname.controller.ts` vers le fichier `/src/sayname/sayname.service.ts` :
``` typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class SaynameService {
    sayMyName(name) {
        return `Your name is ${name}`;
    }
}

```

Pour utiliser ce service, il faut à présent le définir dans le constructeur dans le fichier contrôleur `/src/sayname/sayname.controller.ts` et aussi retourner la réponse de la méthode `sayMyName` définie dans le service :
``` typescript
import { Body, Controller, Post } from '@nestjs/common';
import { SaynameDto } from 'src/dto/sayname.dto';
import { SaynameService } from './sayname.service';

@Controller('sayname')
export class SaynameController {

    constructor(
        private readonly saynameService: SaynameService
    ){}

    @Post()
    sayMyName(@Body() name: SaynameDto) {
        return this.saynameService.sayMyName(name.name);
    }
}

```

Si tout fonctionne bien, on devrait obtenir le même résultat :

![image](https://github.com/user-attachments/assets/e97f6154-4324-4d89-aae5-5ce9a8fbec32)

