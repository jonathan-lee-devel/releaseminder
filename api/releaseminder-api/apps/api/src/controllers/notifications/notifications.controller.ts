import {Public} from '@app/auth/auth/supabase/decorators/is-public.decorator';
import {Controller, Get} from '@nestjs/common';

import {host} from '../../config/environment';

@Controller({host, path: 'notifications'})
export class NotificationsController {
  @Public()
  @Get('for-user')
  getNotificationsForUser() {
    return [];
  }
}
