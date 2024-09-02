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
npm i @nestjs/mongoose mongoose
```
Je peux ensuite importer le module `MongooseModule` dans `app.module.ts` :

``` typescript
import { Module } from '@nestjs/common';
import { PostModule } from './posts/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb+srv://mtonnelier:03e300TiCd5Cis3B@atlasparis.0nerc.mongodb.net/posts'),
    PostModule,
  ],
})
export class AppModule {}
```

Ici, la méthode `forRoot()` accepte la mêmme configuration objet que la méthode `mongoose.connect()` précédemment utilisée dans le package Mongoose. J'y renseigne donc l'URI.

### Injection de modèle

Avec Mongoose, tout est dérivé d’un Schéma.
Chaque schéma correspond à une collection MongoDB et définit la structure des documents au sein de cette collection. Les schémas sont utilisés pour définir des Modèles. Les modèles sont responsables de la création et de la lecture des documents à partir de la base de données MongoDB sous-jacente.

Les schémas peuvent être créés avec des décorateurs NestJS, ou manuellement avec Mongoose lui-même. Utiliser des décorateurs pour créer des schémas réduit considérablement le code répétitif et améliore la lisibilité globale du code.

Je créé le dossier `/posts` et son sous-dossier `/schemas` dans `/src` ainsi que le fichier `post.schema.ts` :
``` typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop({ required: true })
    titre: string;

    @Prop({ default: 'Anonyme' })
    auteur: string;

    @Prop({ required: false })
    slug: string;

    @Prop({ required: false, default: 'Post vide' })
    contenu: string;

    @Prop({ required: false, default: Date.now })
    dateCreation: Date;

    @Prop({ required: false, default: false })
    publie : boolean;

    @Prop({ required: false})
    tags: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
```

Le décorateur `@Schema()` marque une classe comme une définition de schéma. Il associe la classe `Post` à une collection MongoDB du même nom, mais avec un “s” supplémentaire à la fin - donc le nom final de la collection MongoDB sera `posts`. Ce décorateur accepte un seul argument optionnel qui est un objet d’options de schéma.

Le décorateur `@Prop()` définit une propriété dans le document. Par exemple, dans la définition de schéma ci-dessus, j’ai défini sept propriétés : `titre`, `auteur`, `slug`, `contenu`, `dateCreation`, `publie`, `tags`. Les types de schéma pour ces propriétés sont automatiquement déduits grâce aux capacités de métadonnées de TypeScript. Cependant, dans des scénarios plus complexes où les types ne peuvent pas être implicitement reflétés (par exemple, des tableaux ou des structures d’objets imbriqués), les types doivent être indiqués explicitement, comme suit :
``` typescript
@Prop([String])
tags: string[];
```

Alternativement, le décorateur `@Prop()` accepte un argument sous forme d’objet d’options. Avec cela, on peut indiquer si une propriété est requise ou non, spécifier une valeur par défaut, ou la marquer comme immuable. Par exemple :
```typescript
@Prop({ required: true })
titre: string;
```


Alternativement, si on préfère ne pas utiliser de décorateurs, on peut définir un schéma manuellement. Par exemple :
``` typescript
export const CatSchema = new mongoose.Schema({
  titre: String,
  dateCreation: Date,
  publie: boolean,
});
```

Le fichier `post.schema.ts` se trouve dans un dossier du répertoire `post`, où on difini également le `PostModule`. Bien que l’on puisse stocker les fichiers de schéma où on le souhaite, il est recommandé de les stocker près de leurs objets de domaine associés, dans le répertoire de module approprié.

`post.module.ts` :
``` typescript
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { Post, PostSchema } from "./schemas/post.schema";

@Module({
  imports: [
    PostModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})

export class PostModule {}
```

Le `MongooseModule` fournit la méthode `forFeature()` pour configurer le module, y compris la définition des modèles. Si on souhaite également utiliser les modèles dans un autre module, il faut ajouter `MongooseModule` à la section exports de `PostModule` et importer `PostModule` dans l’autre module.

Une fois le schéma enregistré, on peut injecter un modèle `Post` dans le `post.service.ts` en utilisant le décorateur `@Injectable()` :
```typescript
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id);
  }

  async delete(id: string): Promise<Post> {
    return this.postModel.findByIdAndDelete(id);
  }

  async update(id: string, post: CreatePostDto): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, post, {new: true});
  }
}
```

### Création du controller `post.controller.ts`

Pour gérer les requêtes HTTP liées aux opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur les posts, je vais créer un contrôleur post.controller.ts dans le projet NestJS. Ce contrôleur sera responsable de l'interface entre les requêtes utilisateurs et les services de l'application, en utilisant les méthodes du PostService pour interagir avec la base de données MongoDB.

Tout d'abord, j'importe les modules nécessaires :
``` typescript
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from './schemas/post.schema';
```

Le service `PostService` est injecté dans le contrôleur pour permettre l'accès aux méthodes de gestion des données du modèle Post.

Ensuite, je définis le contrôleur :
``` typescript
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
...
}
```

Le décorateur `@Controller('post')` définit la route de base pour toutes les requêtes traitées par ce contrôleur. Ici, toutes les routes commenceront par /post.

Je défini enfin les méthodes du contrôlleur qui correspondent aux différentes actions que les utilisateurs peuvent effectuer sur les posts. Chacune de ces méthodes est décorée avec un décorateur qui mappe une route et un type de requête HTTP à la méthode :

- Récupérer tous les posts
> ``` typescript
> @Get()
> async findAll(): Promise<PostModel[]> {
>   return this.postService.findAll();
> }
> ```
> Cette méthode est mappée à la route `/post` avec une requête GET. Elle renvoie tous les posts stockés dans la base de données.

- Récupérer un post par ID
> ```
> @Get(':id')
> async findOne(@Param('id') id: string): Promise<PostModel> {
>   return this.postService.findOne(id);
> }
> ```
> Ici, la route est `/post/:id`, où `:id` est un paramètre dynamique. Cette méthode permet de récupérer un post spécifique en fonction de son ID.

- Créer un nouveau post
> ``` typescript
> @Post()
> async create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
>   return this.postService.create(createPostDto);
> }
> ```
> Cette méthode utilise la route `/post` avec une requête POST pour créer un nouveau post. Les données du post sont passées dans le corps de la requête sous forme de DTO (Data Transfer Object).

- Modifier un post
> ``` typescript
> @Put(':id')
> async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto): Promise<PostModel> {
>   return this.postService.update(id, updatePostDto);
> }
> ```
> Cette méthode mappée à la route `/post/:id` avec une requête PUT permet de mettre à jour un post existant. L'ID du post à mettre à jour est passé en paramètre, et les nouvelles données sont passées dans le corps de la requête.

- Supprimer un post
> ``` typescript
> @Delete(':id')
> async delete(@Param('id') id: string) {
>   this.postService.delete(id);
> }
> ```
> Enfin, cette méthode, qui correspond à une requête DELETE sur la route `/post/:id`, permet de supprimer un post en fonction de son ID.

