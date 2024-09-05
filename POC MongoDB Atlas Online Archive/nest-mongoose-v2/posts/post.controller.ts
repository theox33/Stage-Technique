import { Controller, Get, Post, Param, Body, Render, Res, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  @Render('index')
  async index(@Query('search') search: string, @Query('sort') sort: string) {
    const posts = await this.postService.findAll(search, sort);
    return { posts, search, sort };
  }

  @Get('/new-post')
  @Render('new-post')
  newPost() {
    return {};
  }

  @Post('/post')
  async createPost(@Body() createPostDto: CreatePostDto, @Res() res) {
    await this.postService.create(createPostDto);
    res.redirect('/');
  }

  @Get('/edit-post/:id')
  @Render('edit-post')
  async editPost(@Param('id') id: string) {
    const post = await this.postService.findOne(id);
    return { post };
  }

  @Post('/post/:id')
  async updatePost(@Param('id') id: string, @Body() createPostDto: CreatePostDto, @Res() res) {
    await this.postService.update(id, createPostDto);
    res.redirect('/');
  }

  @Post('/post/:id/delete')
  async deletePost(@Param('id') id: string, @Res() res) {
    await this.postService.remove(id);
    res.redirect('/');
  }
}
