import { API_ROUTES } from './api-routes.constant';
import { RSVP_STATUS } from './rsvp-status.constant';
import { UI_MESSAGES } from './ui-messages.constant';
import { HTTP_METHODS, HTTP_HEADERS, DEFAULT_API_BASE_URL } from './http.constant';
import { DATE_FORMAT_LOCALE, FULL_DATE_FORMAT_OPTIONS, CARD_DATE_FORMAT_OPTIONS } from './date-format.constant';
import { AVATAR_API_BASE, getAvatarUrl } from './avatar.constant';
import { DEFAULT_DEMO_PASSWORD, AUTH_STORAGE_KEYS } from './auth.constant';
import { SITE_METADATA } from './metadata.constant';
import { QUERY_PARAMS } from './query-params.constant';
import { DEFAULT_EVENT_CATEGORIES, DEFAULT_EVENT_CATEGORY } from './event-categories.constant';
import { DEFAULT_EVENT_CAPACITY } from './event-defaults.constant';
import { THEME_MODE, THEME_STORAGE_KEY } from './theme.constant';

/**
 * Central application constants registry object.
 */
export const APP_CONSTANTS = {
  ROUTES: API_ROUTES,
  RSVP: RSVP_STATUS,
  MESSAGES: UI_MESSAGES,
  HTTP: HTTP_METHODS,
  HEADERS: HTTP_HEADERS,
  DEFAULT_API_BASE_URL,
  DATE: {
    LOCALE: DATE_FORMAT_LOCALE,
    FULL_OPTIONS: FULL_DATE_FORMAT_OPTIONS,
    CARD_OPTIONS: CARD_DATE_FORMAT_OPTIONS,
  },
  AVATAR: {
    BASE_URL: AVATAR_API_BASE,
    getUrl: getAvatarUrl,
  },
  AUTH: {
    DEFAULT_PASSWORD: DEFAULT_DEMO_PASSWORD,
    STORAGE_KEYS: AUTH_STORAGE_KEYS,
  },
  THEME: THEME_MODE,
  THEME_STORAGE_KEY,
  METADATA: SITE_METADATA,
  QUERY: QUERY_PARAMS,
  CATEGORIES: DEFAULT_EVENT_CATEGORIES,
  DEFAULT_CATEGORY: DEFAULT_EVENT_CATEGORY,
  DEFAULT_CAPACITY: DEFAULT_EVENT_CAPACITY,
} as const;

/**
 * Returns the entire centralized application constants registry.
 */
export function getAppConstants() {
  return APP_CONSTANTS;
}

/**
 * Helper function to extract array of values from any constant dictionary object or array.
 */
export function getConstantValues<T>(
  constantObj: T
): T extends readonly (infer U)[] ? U[] : Array<T[keyof T]> {
  return (Array.isArray(constantObj) ? [...constantObj] : Object.values(constantObj as any)) as any;
}
