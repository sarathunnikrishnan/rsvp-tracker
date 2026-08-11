/**
 * Date helper utilities for database and API serialization.
 */

/**
 * Formats a Date object or ISO date string into a MySQL-compatible DATETIME string ('YYYY-MM-DD HH:MM:SS').
 */
export function formatMysqlDateTime(dateInput: string | Date): string {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format provided');
  }

  const pad = (num: number) => num.toString().padStart(2, '0');

  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
