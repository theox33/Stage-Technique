# Comment gérer la notion d'archivage (froid ❄️) ?

## Configuration d’Online Archive 🛠️

La première des choses à faire, est d’accéder aux bases de données et de sélectionner une collection sur laquelle l’archive doit être exécutée.

Ici, j’ai créé une base de données `documents` avec un id, une couleur, un prénom et une année.

Mon but est de configurer/modifier l’archive en ligne, l’exécuter et l’interroger.

![image](https://github.com/user-attachments/assets/c39c7435-d6bd-4de9-83da-56c873b4b4ed)

Ce que je souhaite faire ici, c’est d’archiver les personnes nées en 2000 car dans notre cas on va supposer que ce sont des données que l’on accède peu souvent.

Je me rends donc dans l’onglet `Online Archive` et je créé une nouvelle archive. C’est ici que l’on peut notamment définir les critères d’archivage de nos données :

![image](https://github.com/user-attachments/assets/16bfff1f-ad3a-4058-a328-cf978249db3a)


On voit que par défaut, on nous propose de définir les critères d’archivage par rapport à la date des documents. On peut choisir une durée limite à partir de laquelle on archive nos documents.

Ici, je souhaite archiver mes documents en fonction de l’année de naissance des personnes. Je vais donc dans `Custom Criteria`

![image](https://github.com/user-attachments/assets/67a0eb98-51b5-4c11-a8f9-250724c7a5c7)
 
J’entre en JSON mes conditions d’archivage. Ici, les personnes nées exactement en 2000 seront archivées.

Ensuite, il est demandé d’entréd’entrer les champs de requêtes les plus demandés, puisque l’on archive en fonction de l’année :

![image](https://github.com/user-attachments/assets/3785402c-e5ef-43e5-974d-2f48d6451e11)

Un menu de confirmation avec tous nos critères d’archivage apparaît avant confirmation :

 ![image](https://github.com/user-attachments/assets/0a46e58e-9670-480f-a84d-10ce8683d28a)

### Connection au Cluster 📁

En ouvrant le logiciel `compass`, je peux voir qu’en faisant : `epack.documents.find({‘’year’’:’’2000’’}).count()`, il y a 1 document correspondant à cela. Puisque l’archivage est en cours sur Mongo Atlas, je peux toujours trouver ce document supposément archivé dans le cluster. Une fois dans le statut `idle`, la même commande me renvoie 0. Le document est donc parti du cluster pour aller dans Online Archive et s’archiver.

![image](https://github.com/user-attachments/assets/db218dc3-ccff-44fa-b3cb-981326f9246c)
 
### Connection à Online Archive 📦

Je me connecte à `Online Archive` :

![image](https://github.com/user-attachments/assets/4a01d06e-26e0-4a66-a128-5215cd0eae21)

Le document à la date 2000 se situe bien dans `Online Archive`.
