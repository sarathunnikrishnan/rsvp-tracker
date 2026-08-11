/**
 * Application-wide response and error messages.
 */
export const MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Unauthorized: Authentication token is missing or invalid',
    AUTHENTICATION_FAILED: 'Authentication failed',
    INVALID_TOKEN: 'Invalid or expired authentication token',
    EMAIL_EXISTS: 'An account with this email address already exists.',
    MISSING_FIELDS: 'Name, email, and password are required fields.',
  },
  EVENT: {
    NOT_FOUND: 'Event not found',
    CREATION_FAILED: 'Event creation failed',
    FORBIDDEN_UPDATE: 'Forbidden: You are not the creator of this event.',
    FORBIDDEN_DELETE: 'Forbidden: You are not the creator of this event.',
    DELETED_SUCCESS: 'Event successfully deleted',
  },
  RSVP: {
    EVENT_NOT_FOUND: 'Event not found',
    CAPACITY_REACHED: 'Event capacity has been reached.',
    INVALID_STATUS: 'Invalid RSVP status provided.',
  },
  SERVER: {
    INTERNAL_ERROR: 'Internal server error',
  },
} as const;
