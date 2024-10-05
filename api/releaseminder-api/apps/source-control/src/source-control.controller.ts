import { Controller, Get } from '@nestjs/common';
import { SourceControlService } from './source-control.service';

@Controller()
export class SourceControlController {
  constructor(private readonly sourceControlService: SourceControlService) {}

  @Get()
  getHello(): string {
    return this.sourceControlService.getHello();
  }
}
