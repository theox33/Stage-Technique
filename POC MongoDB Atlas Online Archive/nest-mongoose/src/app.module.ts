import { Module } from '@nestjs/common';
import { PostModule } from './posts/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Mongoose } from 'mongoose';
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
