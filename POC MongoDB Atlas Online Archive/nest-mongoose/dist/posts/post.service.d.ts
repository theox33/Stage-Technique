import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostService {
    private postModel;
    constructor(postModel: Model<Post>);
    create(createPostDto: CreatePostDto): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: string): Promise<Post>;
    delete(id: string): Promise<Post>;
    update(id: string, post: CreatePostDto): Promise<Post>;
}
