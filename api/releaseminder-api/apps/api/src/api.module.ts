import {RabbitmqModule} from '@app/micro/micro';
import {ConfigifyModule} from '@itgorillaz/configify/dist';
import {Module} from '@nestjs/common';

import {ApiController} from './controllers/api/api.controller';
import {TestController} from './controllers/test/test.controller';
import {ApiService} from './services/api/api.service';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    RabbitmqModule.register({
      serviceName: 'BUILD_SYSTEMS',
    }),
    RabbitmqModule.register({
      serviceName: 'CLIENTS',
    }),
    RabbitmqModule.register({
      serviceName: 'COMMS',
    }),
    RabbitmqModule.register({
      serviceName: 'ISSUES',
    }),
    RabbitmqModule.register({
      serviceName: 'PAYMENTS',
    }),
    RabbitmqModule.register({
      serviceName: 'RELEASES',
    }),
    RabbitmqModule.register({
      serviceName: 'SOURCE_CONTROL',
    }),
  ],
  controllers: [ApiController, TestController],
  providers: [ApiService],
})
export class ApiModule {}
