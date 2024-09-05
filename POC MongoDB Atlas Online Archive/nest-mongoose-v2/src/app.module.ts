import { Module } from '@nestjs/common';
import { PostModule } from '../posts/post.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [    
    // Configuration de la connexion MongoDB
    MongooseModule.forRoot('mongodb+srv://mtonnelier:03e300TiCd5Cis3B@atlasparis.0nerc.mongodb.net/posts'),
    PostModule,
  ],
})
export class AppModule {}
