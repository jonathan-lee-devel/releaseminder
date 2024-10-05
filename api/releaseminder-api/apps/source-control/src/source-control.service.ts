import {Injectable} from '@nestjs/common';

@Injectable()
export class SourceControlService {
  getHello(): string {
    return 'Hello World!';
  }
}
