import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from '../core/exceptions/domain.exception';
import { InvalidMoneyException } from '../core/exceptions/domain.exception';

const DOMAIN_STATUS_MAP: Record<string, HttpStatus> = {
  ProductNotFoundException: HttpStatus.NOT_FOUND,
  ProductAlreadyExistsException: HttpStatus.CONFLICT,
  InvalidMoneyException: HttpStatus.BAD_REQUEST,
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = (request.headers['x-request-id'] as string) || 'unknown';

    this.logger.error(`Unhandled exception: ${exception instanceof Error ? exception.message : exception}`, exception instanceof Error ? exception.stack : '');

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'INTERNAL_ERROR';

    if (exception instanceof DomainException) {
      status = DOMAIN_STATUS_MAP[exception.constructor.name] ?? HttpStatus.BAD_REQUEST;
      message = exception.message;
      code = exception.constructor.name.replace(/Exception$/, '').toUpperCase();
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message || exception.message;
      code = status === 404 ? 'NOT_FOUND' : status === 400 ? 'VALIDATION_ERROR' : 'API_ERROR';
    }

    response.status(status).json({
      data: null,
      error: { code, message, details: {} },
      meta: { requestId, timestamp: new Date().toISOString() },
    });
  }
}
