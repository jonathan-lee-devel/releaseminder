import {Injectable} from '@nestjs/common';

@Injectable()
export class BuildSystemsService {
  getHello(): string {
    return 'Hello World!';
  }
}
