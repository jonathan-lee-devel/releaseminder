import { Injectable } from '@nestjs/common';

@Injectable()
export class RmMicroIssuesService {
  getHello(): string {
    return 'Hello World!';
  }
}
