🎯 Présentation des enjeux du projet
___

# Introduction d'`Online Archive` 💾

## L’enjeu de la Data 🔍

À mesure que les données augmentent, il faut savoir que faire d’un volume important de données ou encore de données qui ne sont pas fréquemment consultés par les clients.

Une des solutions les plus simples à mettre en place, est de stocker les données rarement accessibles dans des bases de données de cloud opérationnelles, ce qui entraîne des coûts élevés en cours de route. On peut également supprimer et décharger manuellement des données dans un espace de stockage d’objets cloud distinct.

Il y a donc une question qui se pose lors du stockage des données : *quelles données peut-on archiver et décharger et lesquelles pouvons-nous garder dans nos applications ?*.
*(La première option permettant de réduire les coûts et améliorer les performances, et la deuxième offrant un gain d’accessibilité).*

## Introduction de MongoDB Atlas Online Archive 💾

`Online Archive` combine l’efficacité des coûts du stockage des objets avec une interface de requête unifiée.

Cette technologie permet de répartir les données de manière transparente entre des bases de données entièrement gérées et un stockage d'objets dans le cloud, tout en conservant la possibilité de les interroger via un endpoint unique.

Cela implique donc 3 composantes majeures : 
-	**Automatisation du tiering** *(Élimine la migration ou la suppression manuelle des données. Les archives sont en ligne et facilement accessibles à côté des données du cluster Atlas)*
-	**Facilement interrogeable** *(Conserve un accès facile aux archives en parallèle des données actives. Cela permet de définir des règles d'archivage adaptées à un cas d'utilisation unique. Cela signifie que l’on peut créer des règles d'archivage basées sur les données ou personnalisées qui s'exécutent indéfiniment. Ainsi, on n'a pas besoin de migrer ou de supprimer manuellement des données.)*
-	**Entièrement géré** *(Pas besoin de configurer un stockage d’objets cloud séparé. On peut cependant créer, mettre à jour et interrompre des règles d’archivage via l’UI d’Atlas ou l’API.)*

**Automatisation de l’archivage vers un stockage interrogeable**
-	Rédiger une règle d’archivage basée sur la date ou personnalisée.
-	Transférer les données vers un stockage d’objets entièrement géré.
-	Interroger toutes les données cloud en utilisant un seul endpoint.

``` mermaid
graph LR
    A(["🌐 Atlas Cluster"]) --> B(["🖥️ Application"])
    A --> C(["🗄️ Online Archive"])
    B --> A
    B --> C
    C --> B
```

`Online Archive` permet donc d'automatiser l'archivage vers un stockage interrogeable. On peut définir une règle qui peut être soit basée sur la date, soit une règle d'archivage personnalisée. Cela permettra de déplacer automatiquement les données de notre cluster vers un stockage d'objets entièrement géré. Une fois les données déplacées, on peut ensuite utiliser un point de terminaison unique pour interroger à la fois les données du cluster et les données correspondantes dans les archives.
