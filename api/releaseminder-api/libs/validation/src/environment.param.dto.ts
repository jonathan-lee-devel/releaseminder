import {IsDefined, IsNotEmpty} from 'class-validator';

export class EnvironmentParamDto {
  @IsDefined()
  @IsNotEmpty()
  environment: string;
}
