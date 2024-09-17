# Introduction

## Dépréciation des services Mongo Atlas

Le service permettant la mise en ligne de fichiers avec Online Archive a été dépréciée en début de semaine.
Le travail effectué dans le but de gérer un stockage de fichiers dynamique sur MongoDb Atlas n'est donc plus d'aucune utilité pour la suite.

L'équipe est en train de réfléchir à une autre solution pour staocker les ichiers actuellement.
L'idée qui fait le plus consensus est de garder MongoDB 


## PostgreSQL

Selon le site Web de PostgreSQL, Postgres est « un système de base de données relationnelle objet open-source puissant, avec plus de 30 ans de développement actif, qui lui a valu une solide réputation de fiabilité, de robustesse des fonctionnalités et de performance. »

Comme d'autres bases de données relationnelles, on peut modéliser presque toutes les données et leurs relations en utilisant des tables, des clés, des contraintes, des déclencheurs, et plus encore.

Postgres est actuellement utilisé en production par de nombreuses entreprises technologiques modernes, qu'il s'agisse de petites startups ou de grandes organisations telles qu'Apple, Instagram, Twitch et Reddit.

Postgres lui-même est un « serveur » de base de données. Il existe plusieurs façons de se connecter à Postgres via des « clients », y compris des interfaces graphiques (GUI), des interfaces en ligne de commande (CLI) et des langages de programmation souvent via des ORM.
Pour exécuter et utiliser Postgres sur mon propre ordinateur, il faut *configurer à la fois un **serveur Postgres** et un **client***.

``` mermaid
graph LR
    A[Postgres Server] --> B[GUI Client <br/> E.g. Postbird, PgAdmin4, Postico, etc.]
    A --> C[CLI Client <br/> E.g. psql]
    A --> D[Programming Language Client <br/> E.g. ORM]
    
    style A fill:#4b0082,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#4b0082,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#4b0082,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#4b0082,stroke:#333,stroke-width:2px,color:#fff
```
