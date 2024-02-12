import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    let message = 'Database Query Failed';
    if ('code' in exception) {
      switch (exception.code) {
        case '23505':
          const detail = exception.detail;
          const uniqueConstraintMatch =
            /Key \((.*?)\)=\((.*?)\) already exists/.exec(detail);
          if (uniqueConstraintMatch) {
            const [, column, value] = uniqueConstraintMatch;
            message = `The value '${value}' for '${column}' already exists.`;
          }
          break;
        case '23503':
          message = 'Foreign key violation';
          break;
        case '23502':
          message = 'Not null violation';
          break;
        case '23514':
          message = 'Check violation';
          break;
        case '22P02':
          message = 'Invalid text representation';
          break;
        case '22008':
          message = 'Datetime field overflow';
          break;
        case '22001':
          message = 'String data right truncation';
          break;
        case '42601':
          message = 'Syntax error';
          break;
        default:
          message = `Unhandled database error code: ${exception.code}`;
      }
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
