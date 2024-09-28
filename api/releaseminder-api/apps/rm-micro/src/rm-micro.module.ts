import { Module } from '@nestjs/common';
import { RmMicroController } from './rm-micro.controller';
import { RmMicroService } from './rm-micro.service';

@Module({
  imports: [],
  controllers: [RmMicroController],
  providers: [RmMicroService],
})
export class RmMicroModule {}
