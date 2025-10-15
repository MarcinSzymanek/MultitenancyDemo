import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { prismaUniqueConstraintMessage } from 'src/shared/constants/errorHandling';

@Catch(PrismaClientKnownRequestError)
export class PrismaKnownRequestFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;
    Logger.debug(`Prisma error: ${exception.message}`);

    if (exception.message.includes(prismaUniqueConstraintMessage)) {
      // Unique constraint means record with unique data already exists
      status = HttpStatus.CONFLICT;
      message = 'Cannot create: Record already exists';
    } else {
      // Default to 500 unless it's an HttpException
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'An unknown error has occured. Contact system administrator';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
