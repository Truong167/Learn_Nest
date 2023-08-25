import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SigninDto {
  @ApiProperty()
  @IsNotEmpty()
  accountName: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
