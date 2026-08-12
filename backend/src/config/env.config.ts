import path from 'path';
import dotenv from 'dotenv';

// Load .env from backend directory or root project directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

/**
 * Exposes centralized application environment configuration directly from process.env.
 */
export const envConfig = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '',
  db: {
    url: process.env.DATABASE_URL || '',
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || '',
    ssl: process.env.DB_SSL === 'true',
    sslModeKeyword: process.env.DB_SSL_MODE_KEYWORD || '',
    cloudHostKeyword: process.env.DB_CLOUD_HOST_KEYWORD || '',
  },
};
