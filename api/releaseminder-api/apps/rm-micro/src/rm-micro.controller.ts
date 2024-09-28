import { Controller, Get } from '@nestjs/common';
import { RmMicroService } from './rm-micro.service';

@Controller()
export class RmMicroController {
  constructor(private readonly rmMicroService: RmMicroService) {}

  @Get()
  getHello(): string {
    return this.rmMicroService.getHello();
  }
}
