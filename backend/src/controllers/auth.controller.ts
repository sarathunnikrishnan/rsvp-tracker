import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { getBackendConstants } from '../constants';

const authService = new AuthService();
const constants = getBackendConstants();

/**
 * Controller handling user authentication and demo user retrieval.
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(constants.HTTP_STATUS.OK).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(constants.HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: error.message || constants.MESSAGES.AUTH.AUTHENTICATION_FAILED,
    });
  }
}

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: constants.MESSAGES.AUTH.MISSING_FIELDS,
      });
      return;
    }

    const result = await authService.register(name, email, password);
    res.status(constants.HTTP_STATUS.CREATED).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    const statusCode = error.statusCode || constants.HTTP_STATUS.BAD_REQUEST;
    res.status(statusCode).json({
      success: false,
      message: error.message || constants.MESSAGES.AUTH.AUTHENTICATION_FAILED,
    });
  }
}

export async function getDemoUsers(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const users = await authService.getSeededUsers();
    res.status(constants.HTTP_STATUS.OK).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req: Request, res: Response): Promise<void> {
  res.status(constants.HTTP_STATUS.OK).json({
    success: true,
    data: req.user,
  });
}
