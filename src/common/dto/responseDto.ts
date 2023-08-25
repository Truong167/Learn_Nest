import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MetaResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiPropertyOptional()
  message: string;

  @ApiPropertyOptional()
  error: string;

  constructor(statusCode: number, message?: string, error?: string) {
    this.statusCode = statusCode;
    this.message = message ?? '';
    this.error = error ?? '';
  }
}

export class ResponseDto<T> {
  @ApiProperty()
  result: T;

  @ApiProperty()
  statusCode: number;

  @ApiPropertyOptional()
  message: string;

  constructor(data: T, statusCode: number, message?: string) {
    this.statusCode = statusCode;
    this.message = message ?? '';
    this.result = data;
  }
}
