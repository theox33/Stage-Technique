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