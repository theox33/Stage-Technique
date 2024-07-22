||
| :- |

































### **Ticket TW-611**

#### ***Objectif***

**Mission : Rebranding des Options UI pour les Grands Comptes**

**Description :** Dans le cadre du rebranding, il est nécessaire de mettre à jour les options UI pour les grands comptes ayant un module custom. Pour cela, il faut :

- Ajouter deux colonnes dans le modèle de données : IsWebEPH et CanGoBackHome.
- Forcer la remontée et la relecture du fichier optionsUI.xml lors de chaque synchronisation.

**Solution Technique Détaillée :**

- **Modifications du fichier optionsUI.xml (version 4) :**
  - Actuellement, le fichier optionsUI.xml contient deux informations non synchronisées : IsWebEPH et CanGoBackHome.
  - Le nœud IsWebEPH permet de cacher l'URL dans le navigateur intégré de la version 4.
- **Paramétrage depuis le backoffice :**
  - Il doit être possible de paramétrer ces champs (IsWebEPH et CanGoBackHome) depuis le backoffice.
- **Modifications côté API (version 4) :**
  - Ajouter ces deux champs (IsWebEPH et CanGoBackHome) dans le modèle de données de l'API V4.
- **Script SQL :**
  - Écrire un script SQL pour ajouter les colonnes IsWebEPH et CanGoBackHome dans la base de données.
- **Synchronisation :**
  - Examiner le code de la synchronisation de la version 5 (API V5) pour implémenter un mécanisme qui force la remontée et la relecture du fichier optionsUI.xml à chaque synchronisation, garantissant ainsi la récupération de toutes les informations.

#### ***Documentation des applications ciblées :***

##### **API Back-Office**

Le Back-office sert d’API entre une base de données configurateur grand compte et le Configurateur. Elle permet la gestion des configurations/modèles pour les clients grand compte. Elle est représentée sous forme d’API REST.

![Une image contenant diagramme, texte, capture d’écran, ligne

Description générée automatiquement](Aspose.Words.a0b2131a-940d-4ad2-979a-614182b7d551.001.png)

[**Documentation complète ici*](Wiki%20API%20Back-Office.pdf)

##### **API ePack V4**

D’après le README.md de l’API V3/V4, cette application permet la synchronisation des solutions vers la base de données Manager.

Cette application repose sur un serveur PHP tournant sur le framework « *Phalconphp* ». Tous les échanges sont précédés sous forme de strings JSON.

Cette version de l’API contient les fonctionnalités suivantes :

- Le moteur de synchronisation V4, permettant aux solution V4.1 et plus de synchroniser leurs données (paramétrage et historique), leurs messages et leurs relevés de sondes (*à venir*).
- Les routes utilitaires BackOffice, qui permettent de lancer des tâches 'lourdes' ou de manipulation de données depuis le « *BackOffice ePack-Manager* ».
- Des processus s'exécutant en tache de fond (*workers*), chacun dédié à une action précise.

[**Documentation détaillée ici*](Documentation/Wiki%20API%20ePack%20V4)

#### ***Modifications apportées :***
- **Analyse des documents de référence :**

  J'ai commencé par étudier attentivement la documentation du Back-Office et de l'API ePack V4 afin de bien comprendre la structure actuelle et les points précis de modification requis. Cette étape a permis d'identifier clairement les champs IsWebEPH et CanGoBackHome à ajouter et de planifier les modifications nécessaires dans les fichiers et les modèles de données.
  La plus grosse difficulté rencontrée était d’essayer de comprendre l’architecture du système. Malheureusement, il n’y a pas de documentation sur comment les modules interagissent entre eux. C’est en naviguant dans les différents répertoires des app présentes dans le GitLab que j’ai pu me faire une idée sur leur rôle et répartition dans le système.

  Je me suis créé un rappel afin de schématiser et détailler les communications entre les différentes app, bd, etc..

- **Analyse des répertoires GitLab et implémentation de la foncitonnalité**
  - **App « back-office-manager-v4 »** : À la racine du projet, je pars à la recherche d’un fichier ou ensemble de fichiers pouvant avoir un lien possible avec le fichier côté client « optionUI.xml ». Etant donné que le back office manager gère les configurations utilisateurs et les synchronise via *l’EPACK-API* dans la base de données « *db\_mutualisée* », je suis parti à la recherche de paramètres et/ou fichiers contenant le nom optionui. Je suis assez rapidement tombé sur ce fichier : « *src/Entity/EpackData/EpackParams/SettingsOptionui.php* ».

    Visiblement, les premières lignes de code utilisent Doctrine et ORM. En me renseignant sur le web, Doctrine ORM (Object-Relational Mapping) est une bibliothèque pour PHP qui permet de mapper des objets d’une application à des tables dans une base de données relationnelle. Il facilite les interactions avec la base de données en abstraisant les requêtes SQL et en offrant une API orientée objet pour manipuler les données. Cela signifie qu’on peut travailler avec des objets PHP au lieu d’écrire des requêtes SQL. On ne manipule donc pas directement des tables et colonnes de la BDD mais plutôt des objets.

    - **Détail du code PHP :**
      ![Une image contenant texte, capture d’écran, Police

Description générée automatiquement](Aspose.Words.a0b2131a-940d-4ad2-979a-614182b7d551.002.png)On peut facilement comprendre ici que **@ORM\Entity** indique que cette classe est une entité Doctrine avec sa localisation et **@ORM\Table** spécifie le nom de la table en base de données soit « *setting\_OptionUI* ». Connaître le nom de la table ainsi que son emplacement me permettra d’écrire des commandes SQL afin d’ajouter les colonnes demandées (« IsWebEPH » et « CanGoBackHome ») dans la BDD plus tard.

      ![Une image contenant texte, capture d’écran, Police, logiciel

Description générée automatiquement](Aspose.Words.a0b2131a-940d-4ad2-979a-614182b7d551.003.png)
      J’ai remarqué qu’un pattern de lignes de code se répète souvent dans le programme PHP (lignes 12-19). Il s’agit en réalité d’un exemple de définition de propriété. Ici, **@var int** donne le type de la propriété, **@ORM\Column** configure une colonne en base de données, **@ORM\Id** indique que cette propriété est une clé primaire, **@ORM\GeneratedValue** donne la stratégie de génération de la clé primaire.

      Ensuite, un nouveau pattern récurrent apparaît, il s’agit simplement des getters et des setters :

      ![Une image contenant texte, capture d’écran, Police

Description générée automatiquement](Aspose.Words.a0b2131a-940d-4ad2-979a-614182b7d551.004.png)

    - **Modification du programme :** 
      De manière similaire, je vais donc ajouter les deux colonnes :
      ![Une image contenant texte, capture d’écran, logiciel, Logiciel multimédia

Description générée automatiquement](Aspose.Words.a0b2131a-940d-4ad2-979a-614182b7d551.005.png)
      Ainsi que les accesseurs et mutateurs :
      ![Une image contenant texte, capture d’écran, logiciel

Description générée automatiquement](Aspose.Words.a0b2131a-940d-4ad2-979a-614182b7d551.006.png)
  - **Base de données « db\_mutualisée » d’epack\_manager :**
    Dans le programme précédent, il était indiqué dans la ligne n°8 l’emplacement de l’entité Doctrine, à savoir « App\Repository\EpackData\SettingsOptionuiRepository ». En ouvrant le fichier de configuration de Doctrine « *doctrine.yaml* », j’ai pu constater l’emplacement de la table *SettingsOptionui* que j’ai modifiée :
    ![Une image contenant texte, capture d’écran, menu

Description générée automatiquement](Aspose.Words.a0b2131a-940d-4ad2-979a-614182b7d551.007.png)

    On peut remarquer ainsi que « *epack\_data* » est connecté à la BDD « *epack\_mutualisee* » (lignes 66-67). C’est ici qu’il va falloir ajouter les colonnes en requête SQL via DBeaver.
    Par ailleurs, la connection est confirmée quand j’observe les tables présentes dans cette BDD :
    ![Une image contenant texte, capture d’écran, logiciel, nombre

Description générée automatiquement](Aspose.Words.a0b2131a-940d-4ad2-979a-614182b7d551.008.png)

    Je modifie donc la table :
    ![Une image contenant texte, capture d’écran, Police, ligne

Description générée automatiquement](Aspose.Words.a0b2131a-940d-4ad2-979a-614182b7d551.009.png)

    Les modifications ont bien été apportées :
    ![Une image contenant texte, capture d’écran, logiciel, nombre

Description générée automatiquement](Aspose.Words.a0b2131a-940d-4ad2-979a-614182b7d551.010.png)
  - **EPACK-API :**
    Le rôle de l’API est de faire l’intermédiaire entre le manager côté client et la base de données. De la même manière que tout à l’heure, j’ai cherché un fichier relatif aux option d’UI et ais trouvé celui-ci « *models/EpackData/EpackParams/SettingsOptionui.php* ». En regardant son contenu, il ressemble beaucoup à son homonyme de l’app « *back-office-manager-v4* ». Cela s’explique par le fait qu’il y a différentes manières d’accéder à la BDD. Ainsi de manière similaire :
    ![Une image contenant texte, capture d’écran, logiciel, affichage

Description générée automatiquement](Aspose.Words.a0b2131a-940d-4ad2-979a-614182b7d551.011.png)
#### ***Déploiement et Vérification :***

Je vérifie la bonne implémentation des nouvelles fonctionnalités avec Docker.

2**

