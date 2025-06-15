import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get('')
  getAllUsers() {
    return this.postService.getAllPosts();
  }

  @Get('/:userId')
  getUser(@Param('userId') userId: string) {
    return this.postService.getPostByUserId(userId);
  }
}
