/**
 * Dark and Light Mode Theme Mode Constants.
 */
export const THEME_MODE = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export type ThemeModeType = (typeof THEME_MODE)[keyof typeof THEME_MODE];

/**
 * Storage key identifier for theme persistence.
 */
export const THEME_STORAGE_KEY = 'theme_preference';
