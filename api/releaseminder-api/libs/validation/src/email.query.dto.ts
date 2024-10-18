import {IsDefined, IsEmail, IsNotEmpty} from 'class-validator';

export class EmailQueryDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
