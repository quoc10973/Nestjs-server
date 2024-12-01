import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { postCreateRequest } from './postDTO/postCreateRequest';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/user.entity';
import { create } from 'domain';

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
}
