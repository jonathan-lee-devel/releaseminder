import {ConfigifyModule} from '@itgorillaz/configify/dist';
import {Module} from '@nestjs/common';

import {ApiController} from './controllers/api/api.controller';
import {ApiService} from './services/api/api.service';

@Module({
  imports: [ConfigifyModule.forRootAsync()],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
