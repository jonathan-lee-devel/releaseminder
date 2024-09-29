import { Controller, Get } from '@nestjs/common';
import { RmMicroDevCyclesService } from './rm-micro-dev-cycles.service';

@Controller()
export class RmMicroDevCyclesController {
  constructor(private readonly rmMicroDevCyclesService: RmMicroDevCyclesService) {}

  @Get()
  getHello(): string {
    return this.rmMicroDevCyclesService.getHello();
  }
}
