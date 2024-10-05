import { Module } from '@nestjs/common';
import { BuildSystemsController } from './build-systems.controller';
import { BuildSystemsService } from './build-systems.service';

@Module({
  imports: [],
  controllers: [BuildSystemsController],
  providers: [BuildSystemsService],
})
export class BuildSystemsModule {}
