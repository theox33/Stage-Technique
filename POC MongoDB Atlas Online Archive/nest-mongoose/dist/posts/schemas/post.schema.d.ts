import { HydratedDocument } from 'mongoose';
export type PostDocument = HydratedDocument<Post>;
export declare class Post {
    titre: string;
    auteur: string;
    slug: string;
    contenu: string;
    dateCreation: Date;
    publie: boolean;
    tags: string[];
}
export declare const PostSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any, import("mongoose").Document<unknown, any, Post> & Post & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Post, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Post>> & import("mongoose").FlatRecord<Post> & {
    _id: import("mongoose").Types.ObjectId;
}>;
