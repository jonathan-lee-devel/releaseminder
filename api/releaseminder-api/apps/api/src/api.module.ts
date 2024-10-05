import {ConfigifyModule} from '@itgorillaz/configify/dist';
import {Module} from '@nestjs/common';

import {ApiController} from './api.controller';
import {ApiService} from './api.service';

@Module({
  imports: [ConfigifyModule.forRootAsync()],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
