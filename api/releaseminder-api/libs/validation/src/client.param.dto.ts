import {IsDefined, IsNotEmpty} from 'class-validator';

export class ClientParamDto {
  @IsDefined()
  @IsNotEmpty()
  client: string;
}
