import {ClientParamDto} from '@app/validation/validation/client.param.dto';
import {EnvironmentParamDto} from '@app/validation/validation/environment.param.dto';
import {Controller, Get, HostParam} from '@nestjs/common';

import {host} from '../../config/environment';

@Controller({host, path: 'api'})
export class ApiController {
  @Get()
  public get(
    @HostParam() {client}: ClientParamDto,
    @HostParam() {environment}: EnvironmentParamDto,
  ): string {
    return `${environment?.toLowerCase()} says: Hello ${client?.toLowerCase()}`;
  }
}
