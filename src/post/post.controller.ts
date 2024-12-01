import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { postCreateRequest } from './postDTO/postCreateRequest';
import { CurrentUser } from 'src/user/decorators/currentUser.decorator';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('post')
export class PostController {

    constructor(private postService: PostService) { }

    @Post('/create')
    @UseGuards(AuthGuard)
    async createPost(@Body() post: postCreateRequest, @CurrentUser() currentUser) {
        return this.postService.createPost(post, currentUser);
    }
}
