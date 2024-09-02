# 🛠️ Configuration de l'environnement

## Configuration d'Online Archive

La première des choses à faire, est d’accéder aux bases de données et de sélectionner une collection sur laquelle l’archive doit être exécutée.

Ici, j’ai créé une base de données `documents` avec un id, une couleur, un prénom et une année.

Mon but est de configurer/modifier l’archive en ligne, l’exécuter et l’interroger.

![image](https://github.com/user-attachments/assets/e74b1473-110e-4ea2-a71b-a7b2e27874d3)

Ce que je souhaite faire ici, c’est d’archiver les personnes nées en 2000 car dans notre cas on va supposer que ce sont des données que l’on accède peu souvent.

Je me rends donc dans l’onglet `Online Archive` et je créé une nouvelle archive. C’est ici que l’on peut notamment définir les critères d’archivage de nos données :

![image](https://github.com/user-attachments/assets/bf46c709-fa47-41eb-b0fa-3178797e62cd)

On voit que par défaut, on nous propose de définir les critères d’archivage par rapport à la date des documents. On peut choisir une durée limite à partir de laquelle on archive nos documents.

Ici, je souhaite archiver mes documents en fonction de l’année de naissance des personnes. Je vais donc dans `Custom Criteria`

![image](https://github.com/user-attachments/assets/3da5ff63-caba-4115-8d64-5376f6bf43c1)

J’entre en JSON mes conditions d’archivage. Ici, les personnes nées exactement en 2000 seront archivées.

Ensuite, il est demandé d’entréd’entrer les champs de requêtes les plus demandés, puisque l’on archive en fonction de l’année :

![image](https://github.com/user-attachments/assets/9844a323-0eb2-4328-bbe6-451218effd77)

Un menu de confirmation avec tous nos critères d’archivage apparaît avant confirmation :

![image](https://github.com/user-attachments/assets/7bf1718c-a736-49a0-967a-978328b69620)


### Connexion au Cluster

En ouvrant le logiciel `compass`, je peux voir qu’en faisant : `epack.documents.find({‘’year’’:’’2000’’}).count()`, il y a 1 document correspondant à cela. Puisque l’archivage est en cours sur Mongo Atlas, je peux toujours trouver ce document supposément archivé dans le cluster. Une fois dans le statut `idle`, la même commande me renvoie 0. Le document est donc parti du cluster pour aller dans Online Archive et s’archiver.

![image](https://github.com/user-attachments/assets/9d29a9c9-f07f-45fe-939b-ed6bb8455a53)

### Connexion à Online Archive

Je me connecte à `Online Archive` :

![image](https://github.com/user-attachments/assets/3c941d66-f504-4fc2-a6e7-742df31c6708)

Le document à la date 2000 se situe bien dans `Online Archive`.
