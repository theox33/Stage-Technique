import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from './schemas/post.schema';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAll(): Promise<PostModel[]>;
    findOne(id: string): Promise<PostModel>;
    create(createPostDto: CreatePostDto): Promise<PostModel>;
    update(id: string, updatePostDto: CreatePostDto): Promise<PostModel>;
    delete(id: string): Promise<void>;
}
