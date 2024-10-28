# Authentification

À présent qu'il est possible d'uploader des fichiers, y accéder et les supprimer dans la base de données, il faut s'assurer que chaque utilisateur ait accès `uniquement` à leur propres fichiers privés.

Il faut donc créer une méthode d'authentification solide ainsi que des attributs spécifiques aux documents pour savoir à qui ils appartiennent.

Pour l'authentification, il m'a été demandé d'utiliser une instance locale de `Keycloak` que j'ai déjà paramétré dans le `POC PowerSync`.

## Configuration de Keycloak

Je démarre mon instance avec la commande `./bin/kc.bat start-dev` dans mon powershell et me connecte à l'interface utilisateur web locale.

Je créé :
- un realm `myrealm` qui gère les utilisateurs et leurs authentifications.
- Un client pour l'application NestJS.
- Quelques utilisateurs dans Keycloak.

![image](https://github.com/user-attachments/assets/5bd74fda-3827-4270-b5fb-330ed9c6b0f6)

### Configuration de Keycloak dans l'application NestJS

J'installe le package `@nestjs/keycloak` pour l'intégration de Keycloak avec NestJS : `npm i nest-keycloak-connect`.

Maintenant, je doisa jouter une configuration de sécurité Keycloak dans le module principal `AppModule` :
``` typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { FileModule } from './file/file.module';
import { File } from './file/entities/file.entity';

@Module({
  imports: [
    // Configuration de Keycloak
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/auth',  // URL du serveur Keycloak
      realm: 'myrealm',                             // Nom du realm
      clientId: 'myclient',                         // ID du client Keycloak
      secret: 'your-client-secret',                 // Secret du client Keycloak
    }),
    
    // Configuration de TypeORM pour PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',  // Adresse de la base de données
      port: 5433,         // Port PostgreSQL par défaut
      username: 'postgres', // Nom d'utilisateur de la base de données
      password: 'password', // Mot de passe de la base de données
      database: 'upload-api', // Nom de la base de données
      entities: [File],       // Entités à inclure
      synchronize: true,      // Auto-sync pour le développement
    }),

    // Import du module File
    FileModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,  // Utilisation de ResourceGuard pour protéger les routes
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,  // Utilisation de RoleGuard pour gérer les rôles
    },
  ],
})
export class AppModule {}
```

### Création du champ `userId` dans l'entité `File`

J'ajoute un champ `userId` à l'entité `File` pour identifier l'utilisateur ayant uploadé le fichier.
Ce champ correspondra à l'ID Keycloak de l'utilisateur.
`file/entities/file.entity.ts`
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

  @Column({ type: 'varchar' })
  userId: string; // ID Keycloak de l'utilisateur
}
```

### Mise à jour du service `FileService`

Il faut maintenant ajuster les méthodes pour gérer les fichiers par `userId` en ajoutant une vérification pour que les utilisateurs accèdent uniquement à leurs propres fichiers.

``` typescript
