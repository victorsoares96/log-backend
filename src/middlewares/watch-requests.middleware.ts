import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error.util';
import logger from '../utils/log.util';

export default async function watchRequests(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    logger.info({
      message: `i'm see you!`,
      labels: {
        context: 'route-level-middleware',
      },
    });

    return next();
  } catch (error) {
    if (error instanceof Error) {
      logger.error({
        message: error.message,
        labels: {
          context: 'route-level-middleware',
          errorName: error.name,
          errorStatus: 500,
          errorStack: error.stack,
        },
      });
    } else {
      logger.error({
        message: 'Internal Server Error',
        labels: {
          context: 'middleware',
          errorName: 'Internal Server Error',
          errorStatus: 500,
          errorStack: JSON.stringify(error),
        },
      });
    }
    throw new AppError('Internal Server Error.', 500);
  }
}
