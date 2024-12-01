import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { postCreateRequest } from './postDTO/postCreateRequest';

@Controller('post')
export class PostController {

    constructor(private postService: PostService) { }

    @Post('/create')
    async createPost(@Body() post: postCreateRequest) {
        return this.postService.createPost(post);
    }
}
