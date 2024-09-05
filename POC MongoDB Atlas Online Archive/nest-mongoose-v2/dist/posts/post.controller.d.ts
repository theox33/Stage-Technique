import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    index(search: string, sort: string): Promise<{
        posts: import("./schemas/post.schema").Post[];
        search: string;
        sort: string;
    }>;
    newPost(): {};
    createPost(createPostDto: CreatePostDto, res: any): Promise<void>;
    editPost(id: string): Promise<{
        post: import("./schemas/post.schema").Post;
    }>;
    updatePost(id: string, createPostDto: CreatePostDto, res: any): Promise<void>;
    deletePost(id: string, res: any): Promise<void>;
}
