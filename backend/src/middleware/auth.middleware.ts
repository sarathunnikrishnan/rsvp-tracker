import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.config';
import { getBackendConstants } from '../constants';
import { IUserResponse } from '../types/user.type';

/**
 * Authentication Middleware: Verifies Bearer JWT token and populates req.user.
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const constants = getBackendConstants();
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(constants.HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: constants.MESSAGES.AUTH.UNAUTHORIZED,
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, envConfig.jwtSecret) as IUserResponse;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(constants.HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: constants.MESSAGES.AUTH.INVALID_TOKEN,
    });
  }
}
