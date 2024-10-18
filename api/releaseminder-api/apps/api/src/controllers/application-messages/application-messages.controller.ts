import {Public} from '@app/auth/auth/supabase/decorators/is-public.decorator';
import {Controller, Get} from '@nestjs/common';

import {host} from '../../config/environment';

@Controller({host, path: 'application-messages'})
export class ApplicationMessagesController {
  @Public()
  @Get('public')
  getPublicApplicationMessages() {
    return [];
  }
}
