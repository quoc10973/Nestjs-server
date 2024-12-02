import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { postCreateRequest } from './postDTO/postCreateRequest';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/user.entity';
import { postUpdateRequest } from './postDTO/postUpdateRequest';

@Injectable()
export class PostService {

    constructor(@InjectRepository(Post) private postRepository: Repository<Post>) { }

    async createPost(postCreateRequest: postCreateRequest, currentUser: User) {
        let post = plainToInstance(Post, postCreateRequest);
        post.user = currentUser;
        await this.postRepository.save(post);
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            userId: post.user.id,
            createdAt: post.createdAt,
            updateAt: post.updatedAt
        }
    }

    async getAllPost() {
        return await this.postRepository.find();
    }

    async getPostById(id: number) {
        return await this.postRepository.findOneBy({ id });
    }

    async updatePostById(id: number, postUpdateRequest: postUpdateRequest) {
        let post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        const updatedPost = plainToInstance(Post, { ...post, ...postUpdateRequest });
        await this.postRepository.save(updatedPost);
        return updatedPost;
    }

    async deletePostById(id: number) {
        let post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        await this.postRepository.remove(post);
        return JSON.stringify({ message: `Delete post ${id} successfully` });
    }
}
