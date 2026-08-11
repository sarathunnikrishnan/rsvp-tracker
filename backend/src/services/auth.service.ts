import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2/promise';
import { BaseService } from './base.service';
import { envConfig } from '../config/env.config';
import { getBackendConstants } from '../constants';
import { IUser, IUserResponse } from '../types/user.type';

/**
 * Handles authentication, credential validation, and JWT generation.
 */
export class AuthService extends BaseService {
  public async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: IUserResponse }> {
    const constants = getBackendConstants();

    const rows = await this.query<(IUser & RowDataPacket)[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = rows[0];
    if (!user) {
      throw new Error(constants.MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error(constants.MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const userResponse: IUserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
    };

    const token = jwt.sign(userResponse, envConfig.jwtSecret, {
      expiresIn: envConfig.jwtExpiresIn as any,
    });

    return { token, user: userResponse };
  }

  public async register(
    name: string,
    email: string,
    password: string
  ): Promise<{ token: string; user: IUserResponse }> {
    const constants = getBackendConstants();

    // 1. Check if email already exists
    const existing = await this.query<RowDataPacket[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      const error: any = new Error(constants.MESSAGES.AUTH.EMAIL_EXISTS);
      error.statusCode = 400;
      throw error;
    }

    // 2. Hash password securely using bcrypt with 10 salt rounds
    const password_hash = await bcrypt.hash(password, 10);
    const avatar_url =
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;

    // 3. Insert new user record
    const result = await this.execute(
      'INSERT INTO users (name, email, password_hash, avatar_url) VALUES (?, ?, ?, ?)',
      [name, email, password_hash, avatar_url]
    );

    const userResponse: IUserResponse = {
      id: result.insertId,
      name,
      email,
      avatar_url,
    };

    // 4. Generate JWT authentication token
    const token = jwt.sign(userResponse, envConfig.jwtSecret, {
      expiresIn: envConfig.jwtExpiresIn as any,
    });

    return { token, user: userResponse };
  }

  public async getSeededUsers(): Promise<IUserResponse[]> {
    return await this.query<(IUserResponse & RowDataPacket)[]>(
      'SELECT id, name, email, avatar_url FROM users ORDER BY id ASC'
    );
  }
}
