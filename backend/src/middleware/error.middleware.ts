import { Request, Response, NextFunction } from 'express';
import { getBackendConstants } from '../constants';

/**
 * Global Error Handler Middleware. Prevents sensitive leakage while providing clear status codes.
 */
export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Unhandled Server Error:', err);

  const constants = getBackendConstants();
  const statusCode = err.statusCode || constants.HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || constants.MESSAGES.SERVER.INTERNAL_ERROR;

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}
