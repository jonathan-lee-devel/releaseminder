import {Controller, Post} from '@nestjs/common';

import {host} from '../../config/environment';

@Controller({host, path: 'users'})
export class TestController {
  @Post('authenticated/check-in')
  checkIn() {
    return {isAcknowledged: true};
  }
}
