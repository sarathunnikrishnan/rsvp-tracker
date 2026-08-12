import { SslOptions } from 'mysql2';
import { envConfig } from '../config/env.config';

/**
 * Determines whether SSL connection options are required for the MySQL pool based on environment settings.
 * @returns MySQL SSL configuration object or undefined.
 */
export function getSslOptions(): SslOptions | undefined {
  const isCloudOrSsl =
    envConfig.db.ssl ||
    (envConfig.db.url !== '' && (envConfig.db.url.includes(envConfig.db.sslModeKeyword) || envConfig.db.url.includes(envConfig.db.cloudHostKeyword))) ||
    (envConfig.db.host !== '' && envConfig.db.host.includes(envConfig.db.cloudHostKeyword));

  return isCloudOrSsl ? { rejectUnauthorized: false } : undefined;
}
