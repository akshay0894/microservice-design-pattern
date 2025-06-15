import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CommentService {
  COMMENT_SERVICE_URL = 'http://localhost:3002';
  constructor(private readonly httpService: HttpService) {}

  async getCommentsByUserId(userId: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.COMMENT_SERVICE_URL}/comments/${userId}`),
    );
    return response.data;
  }

  async getAllComments(): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.COMMENT_SERVICE_URL}/comments`),
    );
    return response.data;
  }

  async createComment(createCommentDto: any): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.COMMENT_SERVICE_URL}/comments`,
        createCommentDto,
      ),
    );
    return response.data;
  }
}
