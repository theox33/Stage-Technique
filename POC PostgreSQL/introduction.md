# Introduction POC PostgreSQL

## Dépréciation des services Mongo Atlas

Le service permettant la mise en ligne de fichiers avec Online Archive a été dépréciée en début de semaine. *(Voir la [🛑 Réunion dépréciation](https://github.com/users/theox33/projects/1/views/1?pane=issue&itemId=80737220) pour plus de détails)*

Le travail effectué dans le but de gérer un stockage de fichiers dynamique sur MongoDb Atlas doit donc être interrompu.

Il nous faut donc adopter une nouvelle architecture et y développer d'autres API.

## Objectif

Comme dit à l'issue de la réunion, le travail effectué avec MongoDb Atlas peut me servir de base pour créer une API qui permettra d'uploader des documents et garder leur métadonnées. Pour celà, ma Tech Lead m'a conseillé d'utiliser la BDD PostGreSQL qui permet une gestion de documents native.

L'idée est d'avoir une première esquisse de l'API qui recevra les documents depuis la solution vers PowerSync. Il faut donc qu'elle fonctionne avec des requêtes ajax, et non implémenter du front afin de permettre une scalabilité importante pour potentiellement directement l'implémenter dans le logiciel.

## PostgreSQL

Selon le site Web de PostgreSQL, Postgres est « un système de base de données relationnelle objet open-source puissant, avec plus de 30 ans de développement actif, qui lui a valu une solide réputation de fiabilité, de robustesse des fonctionnalités et de performance. »

Comme d'autres bases de données relationnelles, on peut modéliser presque toutes les données et leurs relations en utilisant des tables, des clés, des contraintes, des déclencheurs, et plus encore.

Postgres est actuellement utilisé en production par de nombreuses entreprises technologiques modernes, qu'il s'agisse de petites startups ou de grandes organisations telles qu'Apple, Instagram, Twitch et Reddit.

Postgres lui-même est un « serveur » de base de données. Il existe plusieurs façons de se connecter à Postgres via des « clients », y compris des interfaces graphiques (GUI), des interfaces en ligne de commande (CLI) et des langages de programmation souvent via des ORM.
Pour exécuter et utiliser Postgres sur mon propre ordinateur, il faut *configurer à la fois un **serveur Postgres** et un **client***.

Dans notre cas, le plus intéressant pour nous est qu'il est possible d'uploader des fichiers tels quel dans la base de donnée Postgre.

``` mermaid
graph LR
    A[(<br/>‎ ‎‎ ‎  ‎ ‎ Serveur‎ ‎ ‎ ‎ ‎ ‎  <br/> Postgre<br/>‎ )] --> B[Client GUI <br/> *Ex: Postbird, PgAdmin4, Postico, etc.*]
    A --> C[Client CLI <br/> *Ex: psql*]
    A --> D[Langage de programmation client <br/> *Ex: ORM*]
    
    style A fill:#4b0082,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#4b0082,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#4b0082,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#4b0082,stroke:#333,stroke-width:2px,color:#fff
```

## Configuration du serveur Postgres

J'ai installé Postgres sur Windows ainsi que le logiciel Dbeaver qui permet d'avoir une interface graphique avec Postgres au lieu d'utiliser exclusivement les commandes dans un terminal.
À partir de DBeaver je peux commencer à écrire des requêtes SQL, sélectionner une base de données avec laquelle travailler, ajouter des tables et les manipuler.

Je ne vais pas détailler l'intallation de PostgreSQL car il s'agit d'un simple installeur avec des étapes à suivre.

## Création d'une nouvelle app NestJS

De la même manière que les fois précédentes, je créé une app NestJS en utilisant les commandes du terminal. `nest new upload-api`
Je créé donc le projet `upload-api` qui me permettra :
- Uploader des documents
- Générer un fichier de métadonnées
- Télécharger le document
- Obtenir les métadonnées

Une fois le projet créé, j'installe les dépendances nécessaires comme `multer` pour l'upload de documents et trois autres packages `@nestjs/typeorm`, `typeorm` et `pg`. Le package `@nestjs/typeorm` est utilisé pour obtenir les modules TypeOrm et d’autres modules importants pour travailler avec TypeOrm. J'ai également installé `pg`, qui aide à se connecter et à communiquer avec la base de données PostgreSQL.

### Connexion à la base de données

J'ajoute le module TypeORM dans le module de l'application pour établir la connexion avec PostGreSQL `/src/app.module.ts` comme ceci :

``` typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from './file/file.module';
import { File } from './file/entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'upload-api',
      entities: [File],
      synchronize: true,
      logging: true,
    }),
    FileModule,
  ],
})
export class AppModule {}
```

> Ici, on comprend bien qu'il s'agit des propriétés de ma base de données créé localement précédamment avec PostGreSQL qui sont nécessaires pour établir la connexion avec l'API NestJS. La base de données s'appelle `upload-api` et j'ai mis un profil/mot de passe par défaut simple `postgres`, elle a un port d'écoute je j'ai réglé lors de l'installation à 5432.

> [!NOTE]
> J'ai décidé de créer une entitée nommée `File` pour définir et manipuler des `Files` *(= fichiers)* que je définirai plus tard.

#### Test de connexion

En lançant un simple `npm run start:dev`, je vois si la connexion s'effectue entre mon API et ma BDD.
Auncun message d'erreur ne s'est affiché et l'application fonctionne normalement. Je peux donc continuer.

### Création d'une entité

Maintenant, je peux créer une entité nommée “File” avec laquelle j'effectuerai les opérations CRUD pour la gestion de fichiers :

J'ai découvert qu'on pouvait également faire ça avec une commande dans le terminal : `nest g res file`.

Cela a créé le dossier `/src/file` avec dedans un contrôleur, module et service par défaut pour l'entité `file` ainsi qu'un dossier `/src/file/entities` avec le fichier définissant l'entité file :

![image](https://github.com/user-attachments/assets/3908155d-0645-4287-945d-7c7fc4728c46)

`file.entity.ts`
``` typescript
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  fileName: string;

  @Column({ type: 'varchar' })
  fileType: string;

  @Column({ type: 'int' })
  fileSize: number;

  // Colonne pour stocker les données binaires du fichier
  @Column({ type: 'bytea' })
  fileData: Buffer;
}
```

> J'ai ici défini les colonnes d'une entité `File`. Ainsi, chaque fichier dispose de son identifiant unique, son nom, son type, sa taille, et ses données binaires *(elles seront utilisées pour reconstituer le fichier)*.

### Définition de service et contrôleur de l'entité

Je mets maintenant à jour le fichier de service des fichiers et effectue des opérations CRUD :

`file.service.ts`
``` typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<File> {
    const newFile = new File();
    newFile.fileName = file.originalname;
    newFile.fileType = file.mimetype;
    newFile.fileSize = file.size;
    newFile.fileData = file.buffer;

    return this.fileRepository.save(newFile);
  }

  async getFile(id: number): Promise<File> {
    return this.fileRepository.findOneBy({ id });
  }

  async getFileMetadata(id: number): Promise<File> {
    return this.fileRepository.findOne({
      where: { id },
      select: ['id', 'fileName', 'fileType', 'fileSize'],
    });
  }  
}
```

