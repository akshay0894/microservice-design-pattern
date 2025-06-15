import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PostService {
  POST_SERVICE_URL = 'http://localhost:3001';
  constructor(private readonly httpService: HttpService) {}

  async getPostByUserId(userId: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.POST_SERVICE_URL}/posts/${userId}`),
    );
    return response.data;
  }

  async getAllPosts(): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.POST_SERVICE_URL}/posts`),
    );
    return response.data;
  }

  async createPost(createPostDto: any): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.POST_SERVICE_URL}/posts`, createPostDto),
    );
    return response.data;
  }
}
