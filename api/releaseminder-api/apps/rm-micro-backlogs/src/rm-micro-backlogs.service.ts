import { Injectable } from '@nestjs/common';

@Injectable()
export class RmMicroBacklogsService {
  getHello(): string {
    return 'Hello World!';
  }
}
