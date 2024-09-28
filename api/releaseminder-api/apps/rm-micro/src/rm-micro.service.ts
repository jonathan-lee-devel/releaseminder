import { Injectable } from '@nestjs/common';

@Injectable()
export class RmMicroService {
  getHello(): string {
    return 'Hello World!';
  }
}
