import mysql from 'mysql2/promise';
import { envConfig } from './env.config';

/**
 * Creates and exports a MySQL connection pool for efficient query execution.
 */
export const dbPool = mysql.createPool({
  host: envConfig.db.host,
  port: envConfig.db.port,
  user: envConfig.db.user,
  password: envConfig.db.password,
  database: envConfig.db.name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});
