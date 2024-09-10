# 🖼️ Gestion d'images

Maintenant que je dais comment interragir avec le cluster MongoDB Atlas avec une application NestJS, il est question de s'interresser à la gestion d'images.
Comme je l'avais expliqué lors de l'introduction du projet MongoDB, le but principal est de pouvoir facailiter et optimiser le stockage d'images client notemment en les archivant avec `Online Archive`.

Pour stocker des images dans MongoDB Atlas, il existe plusieurs méthodes, mais l'une des plus courantes consiste à utiliser `GridFS`, une spécification MongoDB permettant de gérer des fichiers de grande taille, tels que des images.

## Introduction à GlusterFS

GridFS est une spécification de MongoDB qui permet de stocker et récupérer des fichiers volumineux, généralement supérieurs à la limite de 16 Mo, qui est la taille maximale d'un document BSON dans MongoDB. Au lieu de stocker un fichier entier dans un seul document, GridFS divise le fichier en plusieurs morceaux (ou chunks) et les stocke dans une collection spécifique. Ces morceaux sont ensuite réassemblés à la demande pour permettre de récupérer le fichier complet.

GridFS utilise deux collections principales :

- `fs.files` : Cette collection contient les métadonnées de chaque fichier, telles que le nom du fichier, la taille, le type MIME, la date de téléchargement, etc.
- `fs.chunks` : Cette collection stocke les différents morceaux du fichier, chaque morceau étant un sous-ensemble des données du fichier.

Par exemple, un fichier de 100 Mo sera divisé en plusieurs parties de 255 Ko (par défaut), et ces parties seront stockées dans la collection `fs.chunks`. Les métadonnées du fichier, telles que son nom et sa taille totale, seront stockées dans `fs.files`.
Grâce à la bibliothèque `multer-gridfs-storage`, je peux gérer facilement l'envoi et le stockage des images dans MongoDB.

## Création de l'app

Je vais donc créer une nouvelle application avec 5 endpoints qui pourront :
1. Uploader un fichier;
2. Uploader des fichiers multiples;
3. Obtenir les infos d'un fichier
4. Obtenir un fichier avec `mongo-gridfs`
5. Supprimer un fichier

### Installation de l'environnement
La première chose à faire est d'installer `multer-gridfs-storage` et `@types/multer-gridfs-storage` pour l'uploading :
``` sh
npm install -save multer-gridfs-storage @types/multer-gridfs-storage
```
Et d'installer `mongo-gridfs` pour obtenir les informations d'un fichier :
```sh
npm install -save github:khoapmd/mongo-gridfs
```

### Uploading
Maintenant, je créé la configuration du service Multer `multer-config.service.ts` pour fournir GridFS en tant qu'option de stockage :
``` typescript
import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import * as GridFsStorage from 'multer-gridfs-storage';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
    gridFsStorage: GridFsStorage;
    constructor() {
        this.gridFsStorage = new GridFsStorage({
            url: 'mongodb://localhost/yourDB',
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    const filename = file.originalname.trim();
                    const fileInfo = {
                      filename: filename
                    };
                    resolve(fileInfo);
                });
              }
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        };
    }
}
```

Maintenant je peux enregistrer `MulterModule` dans la définition du module `files.module.ts` en utilisant la classe de configuration du service :
``` typescript
import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';
import { FilesService } from '././files.service'

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService,
        }),
    ],
    controllers: [FilesController],
    providers: [GridFsMulterConfigService, FilesService],
})
export class FilesModule {}
```

J'ajoute le `FileModule` depuis `file.module.ts` dans l'app `app.module.ts` :
```typescript

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './attachment/files.module';

@Module({
    imports: [ MongooseModule.forRoot('mongodb://localhost/yourDB'),      
        FilesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {

}
```

C'est tout ce qu'il faut pour uploader les fichiers.
Maintenant, je peux utiliser les décorateurs de Multer dans mon contrôleur `pre-file.controller.ts` comme ceux de NestJS :
```typescript
import { Post, Get, Param, Res, Controller, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ApiConsumes, ApiUseTags, UseInterceptors } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('/attachment/files')
@ApiUseTags('Attachments')
export class FilesController {    
    @Post('')
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({name: 'file', required: true, description: 'Attachment files'})
    @UseInterceptors(FilesInterceptor('file'))
    upload(@UploadedFiles() files) {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                id: file.id,
                filename: file.filename,
                metadata: file.metadata,
                bucketName: file.bucketName,
                chunkSize: file.chunkSize,
                size: file.size,
                md5: file.md5,
                uploadDate: file.uploadDate,
                contentType: file.contentType,
            };
            response.push(fileReponse);
        });
        return response;
    }
}
```
On pourrait également choisir d'uniquement uploader un seul fichier à la fois. Dans ce cas il faudrait utiliser `FileInterceptor` et `UploadedFile` sans `s` et sans la boucle évidemment.

### Requêtes pour récupérer les informations, télécharger et supprimer des fichiers
Je créé le fichier `file-info-vm.model.ts` où j'y exporte son modèle `FileInfoVm` :
``` typescript
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileInfoVm {

    @ApiModelProperty()
    @Expose()
    length: number;

    @ApiModelProperty()
    @Expose()
    chunkSize: number;

    @ApiModelProperty()
    @Expose()
    filename: string;    

    @ApiModelProperty()
    @Expose()
    md5: string;

    @ApiModelProperty()
    @Expose()
    contentType: string;
}
```

J'injecte la connection mongoose en utilisant le décorateur `@InjectConnection()` :
``` typescript
constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'images');
  }
```

Ensuite, j'ajoute `readStream`, `findInfo` et `deleteFile` dans `file.service.ts`
``` typescript
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { MongoGridFS } from 'mongo-gridfs'
import { GridFSBucketReadStream } from 'mongodb'
import { FileInfoVm } from './view-models/file-info-vm.model'
import { response } from 'express';

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    const result = await this.fileModel
      .findById(id).catch( err => {throw new HttpException('File not found', HttpStatus.NOT_FOUND)} )
      .then(result => result)
    return{
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType      
    }
  }

  async deleteFile(id: string): Promise<boolean>{
    return await this.fileModel.delete(id)
  }
}
```

Je créé ensuite le fichier `file-response-vm.model.ts` et exporte son modèle `FileResponseVm` :
``` typescript
import { ApiModelProperty } from '@nestjs/swagger';
import { FileInfoVm } from './file-info-vm.model';

export class FileResponseVm {
    @ApiModelProperty() message: string;

    @ApiModelProperty({ type: FileInfoVm })
    file: FileInfoVm;
}
```

Voici donc à quoi ressemble le contrôleur `files.controller.ts` dans sa totalité :
``` typescript

import { Post, Get, Param, Res, Controller, UseInterceptors, UseGuards, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiConsumes, ApiImplicitFile, ApiBadRequestResponse, ApiUseTags } from '@nestjs/swagger';
import { ApiException } from '../shared/api-exception.model';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { FileResponseVm } from './view-models/file-response-vm.model'

@Controller('/attachment/files')
@ApiUseTags('Attachments')
export class FilesController {
    constructor(private filesService: FilesService){}
    @Post('')
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({name: 'file', required: true, description: 'Attachment Files'})
    @UseInterceptors(FilesInterceptor('file'))
    upload(@UploadedFiles() files) {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                id: file.id,
                filename: file.filename,
                metadata: file.metadata,
                bucketName: file.bucketName,
                chunkSize: file.chunkSize,
                size: file.size,
                md5: file.md5,
                uploadDate: file.uploadDate,
                contentType: file.contentType,
            };
            response.push(fileReponse);
        });
        return response;
    }

    @Get('info/:id')
    @ApiBadRequestResponse({ type: ApiException })
    async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {        
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file info', HttpStatus.EXPECTATION_FAILED)
        }
        return {
            message: 'File has been detected',
            file: file
        }
    }

    @Get(':id')
    @ApiBadRequestResponse({ type: ApiException })
    async getFile(@Param('id') id: string, @Res() res) {        
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res)
    }

    @Get('download/:id')
    @ApiBadRequestResponse({ type: ApiException })
    async downloadFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(id)        
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        } 
        res.header('Content-Type', file.contentType);
        res.header('Content-Disposition', 'attachment; filename=' + file.filename);
        return filestream.pipe(res) 
    }

    @Get('delete/:id')
    @ApiBadRequestResponse({ type: ApiException })
    @ApiCreatedResponse({ type: FileResponseVm })
    async deleteFile(@Param('id') id: string): Promise<FileResponseVm> {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.deleteFile(id)
        if(!filestream){
            throw new HttpException('An error occurred during file deletion', HttpStatus.EXPECTATION_FAILED)
        }        
        return {
            message: 'File has been deleted',
            file: file
        }
    }
}
```
