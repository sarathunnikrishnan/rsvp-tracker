/**
 * Standard HTTP Methods used across API fetch calls.
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export type HttpMethodType = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

/**
 * Standard HTTP Headers and Content-Type definitions.
 */
export const HTTP_HEADERS = {
  CONTENT_TYPE_KEY: 'Content-Type',
  APPLICATION_JSON: 'application/json',
  AUTHORIZATION_KEY: 'Authorization',
  BEARER: (token: string) => `Bearer ${token}`,
} as const;

/**
 * Default API Base URL fallback when environment variable is not defined.
 */
export const DEFAULT_API_BASE_URL = 'http://localhost:5000/api';

