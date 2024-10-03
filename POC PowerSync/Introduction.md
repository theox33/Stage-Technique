# Gérer l'upload de documents

## PowerSync

PowerSync est un middleware de synchronisation en temps réel qui permet aux applications de partager des données de manière instantanée via des APIs REST ou GraphQL avec une **connexion persistante**, en utilisant des technologies comme WebSockets ou Server-Sent Events (SSE). Il assure une **communication bidirectionnelle en temps réel entre les systèmes**, garantissant que les modifications de données d'une source sont immédiatement reflétées dans les autres systèmes connectés.

Ceci est un grand avantage par rapport aux autres solutions où ill faut sans arrêt "ping" des machines pour connaître leur état.
Grace à PowerSync, la connexion est persistante et donc il n'y aura nullement besoin de ping pour savoir s'il y a des remontées de syncro à effectuer d'un côté ou de l'autre.
De pluys comme la connexion est constamment ouverte, la synchronisation se fait en temps réel!

### Application dans notre contexte :
Dans notre architecture, PowerSync Services ne fait que du push de données, sans capacité d’écriture dans la base. Nous avons donc développé une API Backend sur mesure qui enregistre les données envoyées par PowerSync dans une base de données Postgres. PowerSync est connecté au WAL (Write-Ahead Logging) de Postgres, ce qui lui permet de détecter et de lire les modifications des données en temps réel dès qu'une entrée est enregistrée, garantissant ainsi une synchronisation instantanée.

Pour améliorer les performances et réduire la charge sur Postgres, nous utiliserons MongoDB Atlas pour stocker les données récupérées par PowerSync. MongoDB servira de cache optimisé pour les opérations de lecture, permettant à PowerSync de récupérer les informations rapidement sans interroger Postgres à chaque requête. Cela garantit une réactivité accrue pour la synchronisation des données tout en maintenant une scalabilité élevée.

Enfin, il faudrait développer une API d'upload pour gérer les fichiers, avec un stockage dans un bucket S3 (par exemple, via Amazon S3), ce qui complètera l'architecture en séparant clairement la gestion des données de celles des fichiers.

## Supabase

Supabase est une plateforme open-source qui fournit une solution complète pour développer des applications backend, similaire à Firebase, mais basée sur des technologies open-source comme Postgres. Elle offre des outils clés pour créer rapidement des applications, notamment une base de données relationnelle, une authentification, un stockage de fichiers, et des fonctions serverless.

Supabase repose sur PostgreSQL, une base de données relationnelle robuste et populaire. En plus des fonctionnalités classiques de PostgreSQL, Supabase ajoute des fonctionnalités comme la gestion des événements en temps réel via Postgres Realtime, qui permet de détecter et de réagir aux modifications de la base de données en temps réel.

Lors de la création de tables dans la base de données, Supabase génère automatiquement une API RESTful pour ces tables, ce qui permet de lire, écrire, mettre à jour et supprimer des données via des requêtes HTTP sans avoir besoin de configurer un serveur API séparé. De plus, Supabase supporte également GraphQL.

Supabase permet d'exécuter des fonctions serverless pour gérer des traitements backend personnalisés. Cela permet de créer des API spécifiques ou d'ajouter de la logique complexe sans gérer d'infrastructure.

Il propose un service de stockage d'objets, similaire à Amazon S3, permettant d'héberger des fichiers (images, vidéos, etc.) directement via leur interface, avec des permissions de sécurité basées sur des règles.

Supabase permet de gérer les accès aux données via des politiques de sécurité basées sur des rôles (Row Level Security), offrant un contrôle précis sur qui peut lire ou écrire dans certaines tables ou colonnes.

## Objectif

Mon objectif est de réaliser une API Supabase où, de manière similaire que l'API avec PostgresSQL, je peux uploader des documents.
De cette manière, il sera possible de synchroniser automatiquement le stockage de fichiers depuis la solution vers le serveur de l'entreprise.

