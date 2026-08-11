/**
 * Avatar generation constants and helper function for fallback profile avatars.
 */
export const AVATAR_API_BASE = 'https://api.dicebear.com/7.x/avataaars/svg?seed=';

/**
 * Returns the provided custom avatar URL or generates a fallback DiceBear avatar based on user name.
 */
export function getAvatarUrl(name: string, customAvatarUrl?: string | null): string {
  if (customAvatarUrl) return customAvatarUrl;
  return `${AVATAR_API_BASE}${encodeURIComponent(name)}`;
}
