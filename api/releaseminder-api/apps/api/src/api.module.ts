import {AuthModule} from '@app/auth/auth';
import {SupabaseAuthGuard} from '@app/auth/auth/supabase/guards/supabase-auth/supabase-auth.guard';
import {RabbitmqModule} from '@app/micro/micro';
import {ConfigifyModule} from '@itgorillaz/configify/dist';
import {Logger, Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';

import {ApiController} from './controllers/api/api.controller';
import {ApplicationMessagesController} from './controllers/application-messages/application-messages.controller';
import {NotificationsController} from './controllers/notifications/notifications.controller';
import {UsersController} from './controllers/users/users.controller';
import {ApiService} from './services/api/api.service';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    ThrottlerModule.forRoot([
      {
        ttl: 5_000,
        limit: 10,
      },
    ]),
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
    AuthModule,
  ],
  controllers: [
    ApiController,
    UsersController,
    ApplicationMessagesController,
    NotificationsController,
  ],
  providers: [
    ApiService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: SupabaseAuthGuard,
    },
    {
      provide: Logger,
      useFactory: () => new Logger(ApiModule.name),
    },
  ],
})
export class ApiModule {}
