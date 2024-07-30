### [🔙 retour vers le Projet complet](https://github.com/users/theox33/projects/1/views/1)
# 🎫 Ticket TW-611

# Table des matières
___
> - [🎯 Objectif](#-objectif-1)
>   - Mission
>     - [Rebranding des Options UI pour les Grands Comptes](#mission-1)
>
>   - Description
>     - [Mise à jour des options UI et ajout de colonnes](#description-1)
> ___
> - 🛠️ Solution Technique Détaillée
>
>   - Modifications du fichier `optionsUI.xml` (version 4)
>     - [Détails des modifications](#modifications-du-fichier-optionsUI.xml-version-4-1)
>
>   - Modifications côté API (version 4)
>     - [Ajout des champs dans le modèle de données](#modifications-côté-api-version-4)
>
>   - Script SQL
>     - [Écrire un script pour ajouter des colonnes](#script-sql)
>
>   - Synchronisation
>     - [Implémentation du mécanisme de synchronisation](#synchronisation)
> ___
> - 📚 Documentation des applications ciblées
>
>   - API Back-Office
>     - [Description de l'API Back-Office](#api-back-office)
>
>   - API ePack V4
>     - [Description de l'API ePack V4](#api-epack-v4)
> ___
> - 🔄 Modifications apportées
>
>   - Analyse des documents de référence
>     - [Étude de la documentation et planification](#analyse-des-documents-de-référence)
>
>   - Analyse des répertoires GitLab et implémentation de la fonctionnalité
>     - App « back-office-manager-v4 »
>       - [Recherche et modifications de fichiers](#app-back-office-manager-v4)
>     - Base de données « db_mutualisée » d’epack_manager
>       - [Ajout de colonnes via script SQL](#base-de-données-db_mutualisée-depack_manager)
>     - EPACK-API
>       - [Modifications de l'API pour gérer les nouvelles colonnes](#epack-api)
> ___
> - 🚀 Déploiement et Vérification
>   - [Vérification de l'implémentation avec Docker](#déploiement-et-vérification)
> ___

## 🎯 Objectif

### Mission

Rebranding des Options UI pour les Grands Comptes

### Description

Dans le cadre du rebranding il est nécessaire de mettre à jour les options UI pour les grands comptes ayant un module custom. Pour cela il faut :
- Ajouter deux colonnes dans le modèle de données : `IsWebEPH` et `CanGoBackHome`.
- Forcer la remontée et la relecture du fichier `optionsUI.xml` lors de chaque synchronisation.

### 🛠️ Solution Technique Détaillée

#### Modifications du fichier `optionsUI.xml` (version 4)

Actuellement le fichier `optionsUI.xml` contient deux informations non synchronisées : `IsWebEPH` et `CanGoBackHome`.
- Le nœud `IsWebEPH` permet de cacher l'URL dans le navigateur intégré de la version 4.
- Paramétrage depuis le backoffice :
  - Il doit être possible de paramétrer ces champs (`IsWebEPH` et `CanGoBackHome`) depuis le backoffice.

#### Modifications côté API (version 4)

- Ajouter ces deux champs (`IsWebEPH` et `CanGoBackHome`) dans le modèle de données de l'API V4.

#### Script SQL

- Écrire un script SQL pour ajouter les colonnes `IsWebEPH` et `CanGoBackHome` dans la base de données.

#### Synchronisation

- Examiner le code de la synchronisation de la version 5 (API V5) pour implémenter un mécanisme qui force la remontée et la relecture du fichier `optionsUI.xml` à chaque synchronisation garantissant ainsi la récupération de toutes les informations.

## 📚 Documentation des applications ciblées

### API Back-Office

Le Back-office sert d’API entre une base de données configurateur grand compte et le Configurateur. Elle permet la gestion des configurations/modèles pour les clients grand compte. Elle est représentée sous forme d’API REST.

*Documentation complète ici*

### API ePack V4

D’après le README.md de l’API V3/V4 cette application permet la synchronisation des solutions vers la base de données Manager.

Cette application repose sur un serveur PHP tournant sur le framework « Phalconphp ». Tous les échanges sont précédés sous forme de strings JSON.

Cette version de l’API contient les fonctionnalités suivantes :
- Le moteur de synchronisation V4 permettant aux solution V4.1 et plus de synchroniser leurs données (paramétrage et historique) leurs messages et leurs relevés de sondes (à venir).
- Les routes utilitaires BackOffice qui permettent de lancer des tâches 'lourdes' ou de manipulation de données depuis le « BackOffice ePack-Manager ».
- Des processus s'exécutant en tâche de fond (workers) chacun dédié à une action précise.

*Documentation détaillée ici*

## 🔄 Modifications apportées

### Analyse des documents de référence

J'ai commencé par étudier attentivement la documentation du Back-Office et de l'API ePack V4 afin de bien comprendre la structure actuelle et les points précis de modification requis. Cette étape a permis d'identifier clairement les champs `IsWebEPH` et `CanGoBackHome` à ajouter et de planifier les modifications nécessaires dans les fichiers et les modèles de données. La plus grosse difficulté rencontrée était d’essayer de comprendre l’architecture du système. Malheureusement il n’y a pas de documentation sur comment les modules interagissent entre eux. C’est en naviguant dans les différents répertoires des app présentes dans le GitLab que j’ai pu me faire une idée sur leur rôle et répartition dans le système. Je me suis créé un rappel afin de schématiser et détailler les communications entre les différentes app bd etc.

### Analyse des répertoires GitLab et implémentation de la fonctionnalité

#### App « back-office-manager-v4 »

À la racine du projet, je pars à la recherche d’un fichier ou ensemble de fichiers pouvant avoir un lien possible avec le fichier côté client `optionUI.xml`. Étant donné que le back office manager gère les configurations utilisateurs et les synchronise via l’EPACK-API dans la base de données « db_mutualisée », je suis parti à la recherche de paramètres et/ou fichiers contenant le nom `optionUI`. Je suis assez rapidement tombé sur ce fichier : `src/Entity/EpackData/EpackParams/SettingsOptionui.php`.

Visiblement les premières lignes de code utilisent Doctrine et ORM. En me renseignant sur le web, Doctrine ORM (Object-Relational Mapping) est une bibliothèque pour PHP qui permet de mapper des objets d’une application à des tables dans une base de données relationnelle. Il facilite les interactions avec la base de données en abstraisant les requêtes SQL et en offrant une API orientée objet pour manipuler les données. Cela signifie qu’on peut travailler avec des objets PHP au lieu d’écrire des requêtes SQL. On ne manipule donc pas directement des tables et colonnes de la BDD mais plutôt des objets.

>##### Détail du code PHP
>
>`BACK-OFFICE-MANAGER-V4/src/Entity/EpackData/EpackParams/SettingsOptionui.php`
>``` php
><?php
>
>namespace App\Entity\EpackData\EpackParams;
>
>use Doctrine\ORM\Mapping as ORM; use App\Entity\BaseEntity as BaseEntity;
>
>#[ORM\Table(name: 'settings_OptionUI', indexes: [new ORM\Index(name: 'solution_id_ID', columns: ['solution_id', 'Id'])])]
>#[ORM\Entity(repositoryClass: 'App\Repository\EpackData\SettingsOptionuiRepository')]
>[...]
>```
>On peut facilement comprendre ici que `@ORM\Entity` indique que cette classe est une entité Doctrine avec sa localisation et `@ORM\Table` spécifie le nom de la table en base de données soit « setting_OptionUI ». >Connaître le nom de la table ainsi que son emplacement me permettra d’écrire des commandes SQL afin d’ajouter les colonnes demandées (« IsWebEPH » et « CanGoBackHome ») dans la BDD plus tard.
>
>J’ai remarqué qu’un pattern de lignes de code se répète souvent dans le programme PHP (lignes 12-19). Il s’agit en réalité d’un exemple de définition de propriété. Ici `@var int` donne le type de la propriété >`@ORM\Column` configure une colonne en base de données `@ORM\Id` indique que cette propriété est une clé primaire `@ORM\GeneratedValue` donne la stratégie de génération de la clé primaire. Ensuite, un nouveau >pattern récurrent apparaît il s’agit simplement des getters et des setters :

##### Modification du programme

De manière similaire, je vais donc ajouter les deux colonnes :

`BACK-OFFICE-MANAGER-V4/src/Entity/EpackData/EpackParams/SettingsOptionui.php`
``` php example-good
[...]
// Ligne 77
    /**
     * @var bool
     */
    #[ORM\Column(name: 'IsWebEPH', type: 'boolean', nullable: false, options: ['default' => 0])]

    protected $iswebeph = 0;

    /**
     * @var bool
     */
    #[ORM\Column(name: 'CanGoBackHome', type: 'boolean', nullable: false, options: ['default' => 1])]

    protected $cangobackhome = 1;
[...]
```
Ainsi que les accesseurs et mutateurs :

`BACK-OFFICE-MANAGER-V4/src/Entity/EpackData/EpackParams/SettingsOptionui.php`
``` php example-good
[...]
// Ligne 192
    public function getIswebeph(): ?bool
    {
        return $this->iswebeph;
    }

    public function setIswebeph(bool $iswebeph): self
    {
        $this->iswebeph = $iswebeph;

        return $this;
    }

    public function getCangobackhome(): ?bool
    {
        return $this->cangobackhome;
    }

    public function setCangobackhome(bool $cangobackhome): self
    {
        $this->cangobackhome = $cangobackhome;

        return $this;
    }
}
```
#### Base de données « db_mutualisée » d’epack_manager

>Dans le programme précédent il était indiqué dans la ligne n°8 l’emplacement de l’entité Doctrine à savoir « `App\Repository\EpackData\SettingsOptionuiRepository` ». En ouvrant le fichier de configuration de >Doctrine « `doctrine.yaml` », j’ai pu constater l’emplacement de la table `SettingsOptionui` que j’ai modifiée :
>``` php
>    orm:
>        auto_generate_proxy_classes: true
>        default_entity_manager: epack_manager
>        entity_managers:
>            epack_manager:
>                connection: epack_manager
>                mappings:
>                    EpackManager:
>                        is_bundle: false
>                        type: annotation
>                        dir: '%kernel.project_dir%/src/Entity/Manager'
>                        prefix: 'App\Entity\Manager'
>                        alias: Manager
>                dql:
>                    string_functions:
>                        NOW: DoctrineExtensions\Query\Mysql\Now
>                        DAY: DoctrineExtensions\Query\Mysql\Day
>                        MONTH: DoctrineExtensions\Query\Mysql\Month
>                        YEAR: DoctrineExtensions\Query\Mysql\Year
>                        DATE: DoctrineExtensions\Query\Mysql\Date
>            epack_data:
>                connection: epack_mutualisee
>                mappings:
>                    EpackData:
>                        is_bundle: false
>                        type: annotation
>                        dir: '%kernel.project_dir%/src/Entity/Data'
>                        prefix: 'App\Entity\Data'
>                        alias: Data
>```
>
>On peut remarquer ainsi que « epack_data » est connecté à la BDD « epack_mutualisee » (lignes 66-67). C’est ici qu’il va falloir ajouter les colonnes en requête SQL via DBeaver. Par ailleurs la connexion est >confirmée quand j’observe les tables présentes dans cette BDD :
>
>![Capture d'écran 2024-07-19 155958](https://github.com/user-attachments/assets/2f62c5c1-7858-4000-92cf-e7cdb0abc988)

Je modifie donc la table avec un script SQL :
```sql
ALTER TABLE settings_OptionUI
ADD COLUMN IsWebEPH BOOLEAN DEFAULT FALSE,
ADD COLUMN CanGoBackHome BOOLEAN DEFAULT TRUE;
```

Les modifications ont bien été apportées :

![alt text](https://github.com/theox33/Ticket-TW-611/blob/main/.img/dbeaver2.png)

#### EPACK-API

Le rôle de l’API est de faire l’intermédiaire entre le manager côté client et la base de données. De la même manière que tout à l’heure, j’ai cherché un fichier relatif aux options d’UI et ai trouvé celui-ci « models/EpackData/EpackParams/SettingsOptionui.php ». En regardant son contenu, il ressemble beaucoup à son homonyme de l’app « back-office-manager-v4 ». Cela s’explique par le fait qu’il y a différentes manières d’accéder à la BDD.

Ainsi de manière similaire :

`EPACK-API/app/models/EpackData/EpackParams/SettingsOptionui.php`
```php
[...]
// Ligne 88
    /**
     * 
     * @var boolean
     * @Column(type="boolean", length=1, nullable=false)
     * @XML(name="IsWebEPH")
     */
    public $IsWebEPH;

    /**
     * 
     * @var boolean
     * @Column(type="boolean", length=1, nullable=false)
     * @XML(name="CanGoBackHome")
     */
    public $CanGoBackHome;
[...]
```

## 🚀 Déploiement et Vérification

Je vérifie la bonne implémentation des nouvelles fonctionnalités avec Docker.
