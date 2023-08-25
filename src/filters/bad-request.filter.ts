import type {
  ExceptionFilter,
  UnprocessableEntityException,
  ArgumentsHost,
} from '@nestjs/common';
import { Catch } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ResponseDto } from 'src/common/dto/responseDto';
import type { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: UnprocessableEntityException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const r = exception.getResponse() as {
      error: string;
      message: ValidationError[];
    };

    const metaResponseDto = new ResponseDto(
      null,
      statusCode,
      r.message as unknown as string,
    );

    response.status(statusCode).json(metaResponseDto);
  }
}
