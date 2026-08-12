import mysql from 'mysql2/promise';
import { getSslOptions } from '../helpers/ssl.helper';

// If DATABASE_URL is provided, use it directly.
// Otherwise, ensure all discrete database environment variables are configured.
if (!process.env.DATABASE_URL) {
  const requiredEnv = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
  ];

  for (const key of requiredEnv) {
    if (!process.env[key]) {
      throw new Error(`${key} is not configured`);
    }
  }
}

const sslOptions = getSslOptions();

/**
 * Creates and exports a MySQL connection pool for efficient query execution.
 */
export const dbPool = process.env.DATABASE_URL
  ? mysql.createPool({
      uri: process.env.DATABASE_URL,
      ssl: sslOptions,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      multipleStatements: true,
    })
  : mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: sslOptions,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      multipleStatements: true,
    });
