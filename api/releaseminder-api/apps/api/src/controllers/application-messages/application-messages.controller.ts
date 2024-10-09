import {Controller, Get} from '@nestjs/common';

import {host} from '../../config/environment';

@Controller({host, path: 'application-messages'})
export class ApplicationMessagesController {
  @Get('public')
  getPublicApplicationMessages() {
    return [];
  }
}
