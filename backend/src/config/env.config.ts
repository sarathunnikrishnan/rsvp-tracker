import path from 'path';
import dotenv from 'dotenv';

// Load .env from backend directory or root project directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

/**
 * Validates and exposes centralized application environment configuration.
 */
export const envConfig = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'super_secret_jwt_key_dexqbit_2026_meetup_tracker',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  db: {
    url: process.env.DATABASE_URL || '',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'dexqbit_user',
    password: process.env.DB_PASSWORD || 'dexqbit_password',
    name: process.env.DB_NAME || 'meetup_tracker',
    ssl: process.env.DB_SSL === 'true',
    sslModeKeyword: process.env.DB_SSL_MODE_KEYWORD || 'ssl-mode=',
    cloudHostKeyword: process.env.DB_CLOUD_HOST_KEYWORD || 'aivencloud.com',
  },
};
