import {RandomService} from '@app/util/util/services/random/random.service';
import {Module} from '@nestjs/common';

@Module({
  providers: [RandomService],
  exports: [RandomService],
})
export class UtilModule {}
