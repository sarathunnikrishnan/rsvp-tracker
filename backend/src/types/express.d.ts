import { IUserResponse } from './user.type.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUserResponse;
    }
  }
}
