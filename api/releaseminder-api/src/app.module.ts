import {Module} from '@nestjs/common';

import {DevTimeblockModule} from './dev-timeblock/dev-timeblock.module';

@Module({
  imports: [DevTimeblockModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
