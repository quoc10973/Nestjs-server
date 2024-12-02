import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])], //tiêm User vì sài UserService cần sử dụng User Repositoy
  providers: [PostService, UserService], //tiêm UserService vì sài AuthGuard cần sử dụng UserService
  controllers: [PostController]
})
export class PostModule { }
