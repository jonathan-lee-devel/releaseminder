import {Body, Controller, Logger, Post} from '@nestjs/common';

import {host} from '../../config/environment';

@Controller({host, path: 'users'})
export class TestController {
  private readonly logger = new Logger(TestController.name);

  @Post('authenticated/check-in')
  checkIn(@Body() body: any) {
    this.logger.log(body);
    return {isAcknowledged: true};
  }
}
