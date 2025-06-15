import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  USER_SERVICE_URL = 'http://localhost:3000';
  constructor(private readonly httpService: HttpService) {}

  async getAllUsers(): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.USER_SERVICE_URL}/users`),
    );
    return response.data;
  }

  async getUserById(id: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.USER_SERVICE_URL}/users/${id}`),
    );
    return response.data;
  }

  async createUser(createPostDto: any): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.USER_SERVICE_URL}/users`, createPostDto),
    );
    return response.data;
  }
}
