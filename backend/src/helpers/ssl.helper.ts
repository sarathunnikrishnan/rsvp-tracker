import { SslOptions } from "mysql2";
import { envConfig } from "../config/env.config";

/**
 * Determines whether SSL connection options are required for the MySQL pool based on environment settings.
 * @returns MySQL SSL configuration object or undefined.
 */
export function getSslOptions(): SslOptions | undefined {
  const { ssl, url, host, sslModeKeyword, cloudHostKeyword } = envConfig.db;

  const hasSslModeInUrl =
    sslModeKeyword !== "" && url !== "" && url.includes(sslModeKeyword);
  const hasCloudHostInUrl =
    cloudHostKeyword !== "" && url !== "" && url.includes(cloudHostKeyword);
  const hasCloudHostInHost =
    cloudHostKeyword !== "" && host !== "" && host.includes(cloudHostKeyword);

  const isCloudOrSsl =
    ssl || hasSslModeInUrl || hasCloudHostInUrl || hasCloudHostInHost;

  return isCloudOrSsl ? { rejectUnauthorized: false } : undefined;
}
