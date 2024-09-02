# 🪿 Mongoose + 🐦 Nest.JS

J’ai précédemment introduit `Mongoose` afin de communiquer avec MongoDB Atlas depuis une application externe.

Cependant, notre objectif n'est pas d'utiliser Mongoose seul mais avec NestJS.
Il me faut donc recommencer le projet avec cette fois-ci NestJS.

## 💻 Application Mongoose

Pour rappel, le projet en question est très simple, il s'agira d'un site internet où les utilisateurs pourront :
1. ***Créer*** un post
2. ***Lire*** les posts disponibles
3. ***Modifier*** les attributs de posts existants
4. ***Supprimer*** des posts.

De cette façon, tous les aspects de gestion de base de données basiques seront maitrisés.

### ⚙️ Installation de l'environnement

Je créé le projet `mongodb-mongoose`, l’initialise, j’installe les packages et ouvre ce projet dans vs code :
``` sh
mkdir mongodb-mongoose
cd mongodb-mongoose
npm init -y
npm i mongoose
npm i -D nodemon
code .
```

J’ajoute à présent un script dans `package.json` pour exécuter le projet. Afin de pouvoir utiliser `await`, je vais utiliser ES Modules au lieu de Common JS. J’ajoute alors le module `type`.

``` typescript
{
  "name": "mongodb-mongoose",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon index.js"
  },
  "type": "module",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "mongoose": "^8.5.4"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

### 🔌 Connexion à MongoDB

Afin de se connecter à MongoDB, il faut créer le fichier `index.js` et utiliser la commande mongoose.connect() avec notre chaîne de connexion MongoDb Atlas :
``` typescript
import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://<utilisateur>:<mdp>@cluster0.eyhty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
```

### 🗂️ Création d'un schéma

Avant de faire quoi que ce soit avec la connexion, il me faut créer un schéma et un modèle.
Il est conseillé dans la documentation de créer un fichier de schéma/modèle pour chaque schéma nécessaire. Je vais donc créer une nouvelle structure de dossier/fichier : `model/Blog.js` :
``` typescript
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const blogSchema = new Schema({
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

const Blog = model('Blog', blogSchema);
export default Blog;
```
