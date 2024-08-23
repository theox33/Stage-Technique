# EOA-3 Est-ce que l'on peut recuperer un document depuis la collection ?

Il est tout à fait possible de récupérer un document depuis une collection.

Dépendamment du langage de programmation utilisé, cela peut varie, mais avec le shell MongoDB, on peut utiliser la méthode find().

Par exemple : 
``` javascript
db.nom_de_la_collection.find({ _id: ObjectId("id_du_document") })
```

Cette commande va récupérer le document avec l’ID spécifié depuis la collection.

Il existe d’autres critères de recherches plus complexes pour filtrer les documents que l’on souhaite récupérer. Voir [find](https://www.mongodb.com/docs/manual/reference/command/find/)
