import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { postCreateRequest } from './postDTO/postCreateRequest';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostService {

    constructor(@InjectRepository(Post) private postRepository: Repository<Post>) { }

    async createPost(postCreateRequest: postCreateRequest) {
        let post = plainToInstance(Post, postCreateRequest);
        return await this.postRepository.save(post);
    }
}
