import { Controller, Get } from '@nestjs/common';
import { BuildSystemsService } from './build-systems.service';

@Controller()
export class BuildSystemsController {
  constructor(private readonly buildSystemsService: BuildSystemsService) {}

  @Get()
  getHello(): string {
    return this.buildSystemsService.getHello();
  }
}
