import {Controller, Get} from '@nestjs/common';
import {DateTime} from 'luxon';

import {host} from '../../config/environment';

@Controller({host, path: 'payments'})
export class PaymentsController {
  @Get('customer-status')
  public get() {
    return {
      status: 'TRIAL',
      trialEndDate: DateTime.now().plus({day: 30}).toJSDate().toISOString(),
    };
  }
}
