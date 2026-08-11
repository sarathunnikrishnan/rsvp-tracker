import { MESSAGES } from './messages.constant';
import { HTTP_STATUS } from './http-status.constant';
import { RSVP_STATUS } from './rsvp-status.constant';
import { DEFAULT_DEMO_PASSWORD } from './auth.constant';
import { QUERY_PARAMS } from './query-params.constant';

/**
 * Central backend application constants registry.
 */
export const BACKEND_CONSTANTS = {
  MESSAGES,
  HTTP_STATUS,
  RSVP_STATUS,
  AUTH: {
    DEFAULT_PASSWORD: DEFAULT_DEMO_PASSWORD,
  },
  QUERY: QUERY_PARAMS,
} as const;

/**
 * Returns the entire backend application constants registry.
 */
export function getBackendConstants() {
  return BACKEND_CONSTANTS;
}

/**
 * Helper function to extract array of values from any constant dictionary object or array.
 */
export function getConstantValues<T>(
  constantObj: T
): T extends readonly (infer U)[] ? U[] : Array<T[keyof T]> {
  return (Array.isArray(constantObj) ? [...constantObj] : Object.values(constantObj as any)) as any;
}
