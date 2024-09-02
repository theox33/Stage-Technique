# 🪿Expérimentation Mongoose

Afin de comprendre le fonctionnement de Mongoose, j'ai décidé d'entreprendre des recherches dans la documentation officielle, communautées, projets GitHub et forums afin de m'approprier au mieu les notions et enjeux de Mongoose.

Dès lors que je trouve des foncitonnalités intéressantes, je les implémenterais dans un projet personnel dit `CRUD` *(Create, Read, Update, Delete)*.
Mon objectif est d'être capable d'utiliser la base de données MongoDB depuis une application externe.

Le projet en question est très simple, il s'agira d'un site internet où les utilisateurs pourront :
1. ***Créer*** un post
2. ***Lire*** les posts disponibles
3. ***Modifier*** les attributs de posts existants
4. ***Supprimer*** des posts.

De cette façon, tous les aspects de gestion de base de données basiques seront maitrisés.

## ☀️Introduction à Mongoose

`Mongoose` permet de communiquer avec `MongoDB Atlas`depuis une application externe.
Mongoose est pensé pour fonctionner avec NodeJS et est une bibliothèque ODM *(Object Data Modeling)* pour MongoDB. Cela permet d’aider la modélisation des données, l’application des schémas, la validation des modèles et la manipulation générale des données. 

Par défaut, MongoDB a un modèle de données flexible. Cela rend les bases de données MongoDB très faciles à modifier et à mettre à jour à l’avenir. Mais beaucoup de développeurs sont habitués à avoir des schémas rigides.
Mongoose impose un schéma semi-rigide dès le départ. Avec Mongoose, les développeurs doivent définir un Schéma et un Modèle.

### 📝 Définition d'un schéma Mongoose

À noter qu’un `schéma` défini la structure d’une collection de documents. Un schéma Mongoose se mappe directement à une collection MongoDB.

Avec les schémas, on définit chaque champ et son type de données. Les types autorisés sont :
- String (Chaîne de caractères)
- Number (Nombre)
- Date (Date)
- Buffer (Tampon)
- Boolean (Booléen)
- Mixed (Mixte)
- ObjectId (Identifiant d’objet)
- Array (Tableau)
- Decimal128 (Décimal128)
- Map (Carte)
---
Par exemple :
``` typescript
const blog = new Schema({
  title: String,
  slug: String,
  published: Boolean,
  author: String,
  content: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
  comments: [{
    user: String,
    content: String,
    votes: Number
  }]
});
```
### 📐 Définition d'un modèle Mongoose

Les modèles prennent un schéma et l’appliquent à chaque document de sa collection. Les modèles sont responsables de toutes les interactions avec les documents, comme *la création, la lecture, la mise à jour et la suppression (CRUD)*.

> Le premier argument passé au modèle doit être la forme singulière du nom de la collection. Mongoose change automatiquement cela en forme plurielle, le transforme en minuscules et l’utilise pour le nom de la collection dans la base de données.

``` typescript
const Blog = mongoose.model('Blog', blog);
```

Dans cet exemple, `Blog` se traduit par la collection `blogs`.

## 💻 Application Mongoose

## 📊 Manipulation de données

### ➕ Insertion de données

Maintenant que je possède mon premier modèle et schéma, je peux commencer à insérer des données dans la base de données.

Je vais directement ajouter ces données à partir du fichier `index.js` :
``` javascript
import mongoose from 'mongoose';
import Blog from './model/Blog';

mongoose.connect("mongodb+srv://mongo:mongo@cluster0.eyhty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

// Créé un nouvel objet blog
const article = new Blog({
  title: 'Awesome Post!',
  slug: 'awesome-post',
  published: true,
  content: 'This is the best post ever',
  tags: ['featured', 'announcement'],
});

// Insère l’article dans la base de données MongoDB
await article.save();
```
Il faut d’abord importer le modèle `Blog` créé. Ensuite je créé un nouvel objet blog puis j’utilise la méthode `save()` pour l’insérer dans la base de données MongoDB.

J’ai décidé d’ajouter un log ensuite, de façon à être sur de ce qui est inséré.
Pour ce faire, on peut utiliser la méthode `findOne()` :
``` javascript
// Cherche un unique post sur le blog
const firstArticle = await Blog.findOne({});
console.log(firstArticle);
```

J’exécute le code avec la commande `npm run dev` :
![image](https://github.com/user-attachments/assets/b845f014-d719-4d5c-bc89-9be60bdba2fb)

En vérifiant sur `Compass`, l’outil de visualisation de base de données MongoDB, on peut constater que les changements ont été appliqués :
![image](https://github.com/user-attachments/assets/2bc6a5fd-fd9f-44d3-8fbb-8f0d5ad30095)

Cependant, pour insérer un document dans la base de données, il a fallu faire deux actions : instancier l’objet, puis l’enregistrer.
Il existe une méthode `create()` qui permet de faire la même chose mais plus simplement en une seule action :
``` javascript
// Créé un nouveau post de blog et l’insère dans la base de données
const article = await Blog.create({
  title: 'Awesome Post!',
  slug: 'awesome-post',
  published: true,
  content: 'This is the best post ever',
  tags: ['featured', 'announcement'],
});

console.log(article);
```

Cette méthode est meilleure car elle permet non seulement d’insérer un document mais également d’obtenir en retour le document avec son identifiant `_id` quand on fait un log dans la console :
![image](https://github.com/user-attachments/assets/abcfc16c-d288-4106-8c23-a2bd073ca114)
![image](https://github.com/user-attachments/assets/2b1d97ca-7a72-4ae2-a23e-999262783404)

### 🔄 Mise à jour de données

Mongoose simplifie également la modification de données.
Je vais modifier le titre de l’article créé en dernier lors de l’étape précédente :
``` javascript
article.title = "The Most Awesomest Post!!";
await article.save();
console.log(article);
```

On peut directement éditer l’objet local, puis utiliser la méthode `save()` pour écrire les modifications vers la base de données.
![image](https://github.com/user-attachments/assets/6f1148df-1029-4f95-91d7-afbf005bc8f6)

Mais il faut avouer que j’ai un peu triché ici, il faudrait pouvoir correctement identifier la donnée pour la modifier...

### 🔍 Trouver des données

Afin d’être sur de modifier le bon document, il faut utiliser la méthode `findById()` *(d’autres méthodes existent bien sûr)* pour obtenir le bon document par son identifiant unique :
``` javascript
const article = await Blog.findById("66cdd2cca6ccc2f10efad6be").exec();
console.log(article);
```
![image](https://github.com/user-attachments/assets/8c110346-a35e-4e8b-a130-ea8c31a47862)

Je peux maintenant modifier absolument ce que je souhaite sur les documents créés jusqu’ici :
``` javascript
import mongoose from 'mongoose';
import Blog from './model/Blog.js';

mongoose.connect("mongodb+srv://mtonnelier:03e300TiCd5Cis3B@atlasparis.0nerc.mongodb.net/epack?retryWrites=true&w=majority&appName=AtlasParis")

// Séléctionner un article par son ID
const premierArticle = await Blog.findById("66cd9f644ad617d09b69867f").exec();
console.log(premierArticle);

// Modifier le titre de l'article sélectionné
premierArticle.title = "Premier article";
await premierArticle.save();
console.log(premierArticle);

const deuxiemeArticle = await Blog.findById("66cdd192052bb7e9c4bb178e").exec();
console.log(deuxiemeArticle);
deuxiemeArticle.title = "Deuxième article";
await deuxiemeArticle.save();
console.log(deuxiemeArticle);

const troisiemeArticle = await Blog.findById("66cdd2cca6ccc2f10efad6be").exec();
console.log(troisiemeArticle);
troisiemeArticle.title = "Troisième article";
await troisiemeArticle.save();
console.log(troisiemeArticle);
```
![image](https://github.com/user-attachments/assets/e5e73f15-bb79-41b1-a40e-ac8f827697b9)

### 📋 Projeter les champs de documents

En MongoDB, projeter signifie *sélectionner uniquement certains champs d’un document pour les inclure dans le résultat d’une requête*. Cela permet de **récupérer uniquement les données nécessaires**, ce qui peut améliorer les performances et réduire la quantité de données transférées.
``` javascript
const article = await Blog.findById("66cdd2cca6ccc2f10efad6be", "title slug content").exec();
console.log(article);
```

Dans cet exemple, au lieu de récupérer tous les champs d’un document, on choisit de ne récupérer que les champs `title`, `slug`, et `content` :
![image](https://github.com/user-attachments/assets/7ae8e256-5c1c-492b-912d-349591ba22ff)

### 🗑️ Supprimer des données

Comme avec le driver classique de `NodeJS`, il existe les méthodes `deleteOne()` et `deleteMany()` dans Mongoose :
``` javascript
// Supprimer un document
const blog = await Blog.deleteOne({ author: "Jesse Hall" })
console.log(blog)

const blog = await Blog.deleteMany({ author: "Jesse Hall" })
console.log(blog)
```

Puisqu’il n’y a pas d’auteurs, aucun document n’a été supprimé :
![image](https://github.com/user-attachments/assets/3abc4c27-31f1-44f6-996e-05e206b67c59)

Si je souhaite tous les supprimer je peux faire :
``` javascript
async function supprfunction() {
    try {
        const result = await Blog.deleteMany({});

        console.log(result);
    } catch (err) {

        console.log(err);
    }
}

supprfunction();
```
J’ai laissé la condition vide afin que tout soit supprimé. J’aurais pu mettre une condition spécifique si j’avais voulu supprimer selon des critères spécifiques certains documents :
![image](https://github.com/user-attachments/assets/732c1a19-eec9-4b74-9d65-5a704b599fa2)
![image](https://github.com/user-attachments/assets/15c73008-f268-4afe-90da-e497df489f13)

### ✔️ Validation

Jusqu’ici les documents que j’ai insérés ne contiennent pas d’auteur, de dates ou de commentaires. Jusqu’à présent, j’ai défini à quoi devrait ressembler la structure d’un document, mais je n’ai pas défini quels champs sont *réellement **obligatoires***. À ce stade, n’importe quel champ peut être omis. On peut donc définir des champs obligatoires dans le schéma `Blog.js` :
``` javascript
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const blogSchema = new Schema({
    title:  {
      type: String,
      required: true,
    },
    slug:  {
      type: String,
      required: true,
      lowercase: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      required: true,
    },
    content: String,
    tags: [String],
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    updatedAt: Date,
    comments: [{
      user: String,
      content: String,
      votes: Number
    }]
  });

const Blog = model('Blog', blogSchema);
export default Blog;
```

Lors de l’inclusion de la validation sur un champ, on passe un objet comme sa valeur.
> `value: String` est équivalent à `value: {type: String}`.
Il existe plusieurs méthodes de validation qui peuvent être utilisées. On peut définir `required` à `true` sur tous les champs qu’on souhaite rendre obligatoires.
Pour le `slug`, on souhaite que la chaîne soit toujours en minuscules. Pour cela, on peut définir `lowercase` à `true`. Cela prendra l’entrée du slug et la convertira en minuscules avant de sauvegarder le document dans la base de données.
Pour la date de création `created`, on peut définir la valeur par défaut en utilisant une fonction.
On veut également que cette date soit impossible à changer plus tard. On peut le faire en définissant `immutable` à `true`.
> Les validateurs ne s’exécutent que sur les méthodes `create` ou `save`.

