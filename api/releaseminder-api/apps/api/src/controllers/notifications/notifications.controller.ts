import {Controller, Get} from '@nestjs/common';

import {host} from '../../config/environment';

@Controller({host, path: 'notifications'})
export class NotificationsController {
  @Get('for-user')
  getNotificationsForUser() {
    return [];
  }
}
