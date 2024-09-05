import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(search?: string, sort?: string): Promise<Post[]> {
    let query = {};

    if (search) {
      query = {
        $or: [
          { titre: { $regex: search, $options: 'i' } },
          { contenu: { $regex: search, $options: 'i' } },
          { auteur: { $regex: search, $options: 'i' } },
        ],
      };
    }

    let sortOption = {};
    if (sort && ['dateCreation', 'titre', 'auteur', 'publie'].includes(sort)) {
      sortOption = { [sort]: 1 };
    }

    return this.postModel.find(query).sort(sortOption).exec();
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async update(id: string, createPostDto: CreatePostDto): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, createPostDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.postModel.findByIdAndDelete(id).exec();
  }
}
