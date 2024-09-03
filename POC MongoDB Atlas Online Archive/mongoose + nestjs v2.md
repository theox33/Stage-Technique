# 🪿 Mongoose + 🐦 Nest.JS v2

Suite à la présentation des développements effectués sur l'application `nest-mongoose` (application CRUD), Mickaël a observé que je n'exploitais pas toutes les capacités de NestJS.
En effet, j'ai intégré les méthodes directement dans le code HTML. Il aurait été plus judicieux de les implémenter selon les principes de NestJS dans la couche backend.
Cela aurait offert une meilleure flexibilité et continuité, car en cas de nécessité de suppression ou de modification de la page HTML, cela n'affecterait pas le fonctionnement du backend, qui manque actuellement de versatilité.

Il est donc préférable de mettre en oeuvre ces méthodes en utilisant correctement le contrôleur et le service NestJS, plutôt que de les intégrer directement dans le code HTML.

J'ai vu qu'il était possible de configurer des moteurs de templates pour générer des pages HTML côté serveur avec NestJS. Je vais donc créer un nouveau dossier `views` au sein du projet nest-mongoose.

Pour ce faire, je dois installer `Handlebars` qui est un moteur de templates utilisé pour générer des pages HTMl dynamiques côté serveur.

``` sh
npm install @nestjs/platform-express hbs
```

Cela permet de combiner des données avec des templates HTML pour générer des pages Web.

## Configuration de Handlebars dans `app.module.ts`
``` typescript
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { join } from 'path';
import { RenderModule } from 'nest-render-module';

@Module({
  imports: [
    PostModule,
    RenderModule.forRoot({
      rootPath: join(__dirname, '..', 'views'), // Path to your views directory
      engine: 'hbs', // Handlebars engine
      extension: 'hbs', // Default extension for templates
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

## Création des vues

Je créé un dossier views à la racine de mon projet. Dans ce dossier, j'y ajoute des fichiers .hbs pour les pages HTML que je veux générer dynamiquement.
J'ai donc pris le contenu de mon ancien index.html et je l'ai transformé en template Handlebars :

### `index.hbs` :
``` hbs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accueil</title>
  <style>
    body { font-family: Arial, sans-serif; }
    .post { border: 1px solid #ccc; padding: 10px; margin: 10px 0; }
    .post h3 { margin: 0; padding: 0; }
    .post button { margin-top: 10px; }
    #searchBar, #sortOptions { margin-bottom: 20px; }
  </style>
</head>
<body>
  <h1>Bienvenue sur le site de gestion des posts</h1>
  <button onclick="window.location.href='/new-post'">Créer un nouveau post</button>
  <div id="searchBar">
    <input type="text" id="searchInput" placeholder="Rechercher...">
    <button onclick="window.location.href='/?search={{searchInput.value}}'">Rechercher</button>
  </div>
  <div id="sortOptions">
    <label for="sortSelect">Trier par :</label>
    <select id="sortSelect" onchange="window.location.href='/?sort={{sortSelect.value}}'">
      <option value="dateCreation">Date de création</option>
      <option value="titre">Titre</option>
      <option value="auteur">Auteur</option>
      <option value="publie">Publié</option>
    </select>
  </div>
  <h2>Posts existants</h2>
  <div id="postsContainer">
    {{#each posts}}
      <div class="post">
        <h3>{{this.titre}}</h3>
        <p><strong>Auteur:</strong> {{this.auteur}}</p>
        <p><strong>Date de création:</strong> {{formatDate this.dateCreation}}</p>
        <p><strong>Contenu:</strong> {{this.contenu}}</p>
        <p><strong>Publié:</strong> {{#if this.publie}}Oui{{else}}Non{{/if}}</p>
        <p><strong>Tags:</strong> {{#if this.tags}}{{this.tags.join ', '}}{{else}}Aucun{{/if}}</p>
        <button onclick="window.location.href='/edit-post/{{this._id}}'">Modifier</button>
        <form action="/post/{{this._id}}" method="POST">
          <input type="hidden" name="_method" value="DELETE">
          <button type="submit">Supprimer</button>
        </form>
      </div>
    {{/each}}
  </div>
</body>
</html>
```

### `new-post.hbs` :

``` hbs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau post</title>
</head>
<body>
  <h1>Créer un nouveau post</h1>
  <form action="/post" method="POST">
    <label for="titre">Titre:</label><br>
    <input type="text" id="titre" name="titre" required><br><br>

    <label for="auteur">Auteur:</label><br>
    <input type="text" id="auteur" name="auteur"><br><br>

    <label for="slug">Slug:</label><br>
    <input type="text" id="slug" name="slug"><br><br>

    <label for="contenu">Contenu:</label><br>
    <textarea id="contenu" name="contenu"></textarea><br><br>

    <label for="dateCreation">Date de Création:</label><br>
    <input type="date" id="dateCreation" name="dateCreation"><br><br>

    <label for="publie">Publié:</label><br>
    <input type="checkbox" id="publie" name="publie"><br><br>

    <label for="tags">Tags (séparés par des virgules):</label><br>
    <input type="text" id="tags" name="tags"><br><br>

    <button type="submit">Créer le post</button>
  </form>
</body>
</html>
```

### `edit-post.hbs` :

``` hbs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modifier le post</title>
</head>
<body>
  <h1>Modifier le post</h1>
  <form action="/post/{{post._id}}" method="POST">
    <input type="hidden" name="_method" value="PUT">
    <label for="editTitre">Titre:</label><br>
    <input type="text" id="editTitre" name="titre" value="{{post.titre}}" required><br><br>

    <label for="editAuteur">Auteur:</label><br>
    <input type="text" id="editAuteur" name="auteur" value="{{post.auteur}}"><br><br>

    <label for="editSlug">Slug:</label><br>
    <input type="text" id="editSlug" name="slug" value="{{post.slug}}"><br><br>

    <label for="editContenu">Contenu:</label><br>
    <textarea id="editContenu" name="contenu">{{post.contenu}}</textarea><br><br>

    <label for="editDateCreation">Date de Création:</label><br>
    <input type="date" id="editDateCreation" name="dateCreation" value="{{formatDate post.dateCreation}}"><br><br>

    <label for="editPublie">Publié:</label><br>
    <input type="checkbox" id="editPublie" name="publie" {{#if post.publie}}checked{{/if}}><br><br>

    <label for="editTags">Tags (séparés par des virgules):</label><br>
    <input type="text" id="editTags" name="tags" value="{{post.tags.join ', '}}"><br><br>

    <button type="submit">Enregistrer les modifications</button>
    <button type="button" onclick="window.location.href='/index.html'">Annuler</button>
  </form>
</body>
</html>
```

## Modification du contrôleur

J'ai ensuite modifié mes contrôleurs pour qu'ils utilisent ces templates Handlebars.
Par exemple, dans mon contrôleur principal (post.controller.ts), j'ai configuré la méthode index() pour rendre la vue index.hbs avec les données nécessaires.
Voici à quoi ressemble maintenant ce contrôleur :

``` typescript
import { Controller, Get, Post, Param, Body, Render, Res, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './create-post.dto';

@Controller()
export class AppController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  @Render('index')
  async index(@Query('search') search: string, @Query('sort') sort: string) {
    const posts = await this.postService.findAll(search, sort);
    return { posts };
  }

  @Get('/new-post')
  @Render('new-post')
  newPost() {
    return {};
  }

  @Post('/post')
  async createPost(@Body() createPostDto: CreatePostDto, @Res() res) {
    await this.postService.create(createPostDto);
    res.redirect('/');
  }

  @Get('/edit-post/:id')
  @Render('edit-post')
  async editPost(@Param('id') id: string) {
    const post = await this.postService.findOne(id);
    return { post };
  }

  @Post('/post/:id')
  async updatePost(@Param('id') id: string, @Body() createPostDto: CreatePostDto, @Res() res) {
    await this.postService.update(id, createPostDto);
    res.redirect('/');
  }

  @Post('/post/:id/delete')
  async deletePost(@Param('id') id: string, @Res() res) {
    await this.postService.remove(id);
    res.redirect('/');
  }
}
```

### `fetchPosts`
`fetchPosts` était une fonction JavaScript qui récupérait les posts via une requête `fetch` au backend et les affichait sur la page.

Maintenant cette logique est implémentée dans le contrôleur principal (`AppController`) de NestJS :
``` typescript
@Controller()
export class AppController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  @Render('index')
  async index(@Query('search') search: string, @Query('sort') sort: string) {
    const posts = await this.postService.findAll(search, sort);
    return { posts };
  }
}
```
- `@Get('/')` : Cette méthode est appelée lorsque l'utilisateur accède à la racine du site (`/`).
- `postService.findAll()` : Remplace `fetchPosts` en récupérant les posts depuis la base de données.
- `@Render('index')` : Rend la vue index.hbs en injectant les données des posts.

### `deletePost`
`deletePost` était une fonction JavaScript qui envoyait une requête DELETE pour supprimer un post.
Maintenant la logique de suppression est gérée côté serveur dans le contrôleur.
``` typescript
@Controller()
export class AppController {
  constructor(private readonly postService: PostService) {}

  @Post('/post/:id/delete')
  async deletePost(@Param('id') id: string, @Res() res) {
    await this.postService.remove(id);
    res.redirect('/');
  }
}
```
- `@Post('/post/:id/delete')` : Remplace la fonction JavaScript `deletePost` en capturant les requêtes POST pour supprimer un post spécifique.
- `postService.remove()` : Supprime le post de la base de données.
- `res.redirect('/')` : Redirige l'utilisateur vers la page d'accueil après suppression.

### `sortPosts` et `filterPosts`
`sortPosts` et `filterPosts` étaient des fonctions JavaScript pour trier et filtrer les posts côté client.
Maintenant le tri et le filtrage se font via des paramètres de requête dans l'URL, et la logique est gérée dans la méthode `index()` du contrôleur.
```typescript
@Controller()
export class AppController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  @Render('index')
  async index(@Query('search') search: string, @Query('sort') sort: string) {
    const posts = await this.postService.findAll(search, sort);
    return { posts };
  }
}
```
- `@Query('search') search` et `@Query('sort') sort` : Capturent les paramètres de recherche et de tri de l'URL.
- `postService.findAll(search, sort)` : Applique le filtre et le tri au niveau de la base de données, retournant les posts correspondants.

### `fetchPostDetails`
`fetchPostDetails` était une fonction JavaScript qui récupérait les détails d'un post spécifique pour le pré-remplir dans un formulaire d'édition.
Maintenant la récupération des détails du post est gérée côté serveur.

``` typescript
@Controller()
export class AppController {
  constructor(private readonly postService: PostService) {}

  @Get('/edit-post/:id')
  @Render('edit-post')
  async editPost(@Param('id') id: string) {
    const post = await this.postService.findOne(id);
    return { post };
  }
}
```
- `@Get('/edit-post/:id')` : Remplace `fetchPostDetails` en récupérant les détails d'un post spécifique lorsque l'utilisateur accède à la page d'édition.
- `postService.findOne(id)` : Récupère le post depuis la base de données.

### Soumission des formulaires
La soumission des formulaires (`new-post`, `edit-post`) était interceptée par du JavaScript pour envoyer les données via `fetch`.
Maintenant la soumission est gérée directement par le backend en utilisant les méthodes POST dans les contrôleurs.

``` typescript
@Post('/post')
async createPost(@Body() createPostDto: CreatePostDto, @Res() res) {
  await this.postService.create(createPostDto);
  res.redirect('/');
}

@Post('/post/:id')
async updatePost(@Param('id') id: string, @Body() createPostDto: CreatePostDto, @Res() res) {
  await this.postService.update(id, createPostDto);
  res.redirect('/');
}
```
- `@Post('/post')` : Crée un nouveau post à partir des données soumises.
- `@Post('/post/:id')` : Met à jour un post existant avec les nouvelles données

## Définition des méthodes dans le service

Le service gérera les opérations de base de données pour récupérer, créer, modifier, et supprimer les posts :
```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findAll(search?: string, sort?: string): Promise<Post[]> {
    let query = this.postModel.find();

    if (search) {
      query = query.find({
        $or: [
          { titre: new RegExp(search, 'i') },
          { auteur: new RegExp(search, 'i') },
          { contenu: new RegExp(search, 'i') },
          { tags: new RegExp(search, 'i') },
        ],
      });
    }

    if (sort) {
      query = query.sort({ [sort]: 1 });
    }

    return query.exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async update(id: string, createPostDto: CreatePostDto): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, createPostDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}
```

### Ajout de la méthode findAll :

- Cette méthode est utilisée pour récupérer tous les posts de la base de données, avec des options pour la recherche (search) et le tri (sort).
- Elle remplace la logique de filtrage et de tri qui était précédemment gérée côté client par des fonctions JavaScript (filterPosts et sortPosts).

### Méthode findOne :

- Récupère un seul post par son identifiant. Cette méthode n'a probablement pas changé, mais elle est essentielle pour récupérer les détails d'un post lors de l'édition.

### Méthode create :

- Crée un nouveau post dans la base de données à partir des données fournies via un DTO (Data Transfer Object).
- Cela remplace la soumission du formulaire via JavaScript.

### Méthode update :

- Met à jour un post existant avec de nouvelles données.
- Cette méthode est utilisée lors de la soumission du formulaire de modification d'un post.
### Méthode remove :

- Supprime un post de la base de données par son identifiant.
- Cette méthode remplace la fonction JavaScript deletePost.
