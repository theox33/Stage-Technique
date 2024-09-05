import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDocument } from './schemas/post.schema';
export declare class PostService {
    private postModel;
    constructor(postModel: Model<PostDocument>);
    findAll(search?: string, sort?: string): Promise<Post[]>;
    create(createPostDto: CreatePostDto): Promise<Post>;
    findOne(id: string): Promise<Post>;
    update(id: string, createPostDto: CreatePostDto): Promise<Post>;
    remove(id: string): Promise<void>;
}
