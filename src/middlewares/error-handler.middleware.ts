import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error.util';
import logger from '../utils/log.util';

export default function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (error instanceof AppError) {
    logger.error({
      message: error.message,
      labels: {
        context: 'error-handler-middleware',
        errorName: error.name,
        errorStatus: error.statusCode,
        errorStack: error.stack,
      },
    });
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  logger.error({
    message: error.message,
    labels: {
      context: 'error-handler-middleware',
      errorName: error.name,
      errorStatus: 500,
      errorStack: error.stack,
    },
  });

  return response.status(500).json({
    status: 'error',
    message: error.message,
  });
}
