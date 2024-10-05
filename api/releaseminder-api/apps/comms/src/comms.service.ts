import { Injectable } from '@nestjs/common';

@Injectable()
export class CommsService {
  getHello(): string {
    return 'Hello World!';
  }
}
