import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { postCreateRequest } from './postDTO/postCreateRequest';
import { CurrentUser } from 'src/user/decorators/currentUser.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';

@Controller('post')
export class PostController {

    constructor(private postService: PostService) { }

    @Post('/create')
    @UseGuards(AuthGuard, new AuthorizationGuard(['USER', 'ADMIN']))
    async createPost(@Body() post: postCreateRequest, @CurrentUser() currentUser) {
        return this.postService.createPost(post, currentUser);
    }

    @Get('/getall')
    async getAllPost() {
        return this.postService.getAllPost();
    }

    @Get('/getbyid') //http://localhost:8080/post/getbyid?id=XXX
    @UseGuards(AuthGuard)
    async getPostById(@Query('id', ParseIntPipe) id: number) {
        return this.postService.getPostById(id);
    }

    @Put('/update') //http://localhost:8080/post/update?id=XXX
    @UseGuards(AuthGuard)
    async updatePostById(@Query('id', ParseIntPipe) id: number, @Body() postUpdateRequest) {
        return this.postService.updatePostById(id, postUpdateRequest);
    }

    @Delete('/delete') //http://localhost:8080/post/delete?id=XXX
    async deletePostById(@Query('id', ParseIntPipe) id: number) {
        return this.postService.deletePostById(id);
    }


}
