import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Get('')
  getAllComments() {
    return this.commentService.getAllComments();
  }

  @Get('/:userId')
  getUser(@Param('userId') userId: string) {
    return this.commentService.getCommentsByUserId(userId);
  }
}
