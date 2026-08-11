/**
 * Centralized UI messages, alerts, confirmation prompts, and helper text.
 */
export const UI_MESSAGES = {
  CONFIRMATIONS: {
    DELETE_EVENT: 'Are you sure you want to delete this event? This action cannot be undone.',
  },
  ERRORS: {
    DELETE_EVENT_FAILED: 'Failed to delete event.',
    CREATE_EVENT_FAILED: 'Failed to create event. Check inputs and try again.',
    UPDATE_EVENT_FAILED: 'Failed to update event details.',
    LOGIN_FAILED: 'Invalid email or password. Try selecting a pre-seeded demo user below!',
    REGISTRATION_FAILED: 'Failed to create account. Check inputs and try again.',
    PASSWORDS_DONT_MATCH: 'Passwords do not match. Please re-enter.',
    RSVP_FAILED: 'Failed to update RSVP status',
    AUTH_PROVIDER_REQUIRED: 'useAuth must be used within an AuthProvider',
    THEME_PROVIDER_REQUIRED: 'useTheme must be used within a ThemeProvider',
    DEFAULT_API_ERROR: 'An error occurred during request execution.',
    NETWORK_FAILURE: 'Network failure connecting to API server.',
  },
  TOOLTIPS: {
    SHOW_PASSWORD: 'Show password',
    HIDE_PASSWORD: 'Hide password',
  },
  DESCRIPTIONS: {
    LOGIN_SUBTITLE: 'Access RSVP features and manage your meetups',
    REGISTER_SUBTITLE: 'Create your Dexqbit account to host and RSVP for meetups',
    CREATE_EVENT_SUBTITLE: 'Fill in details to host a community meetup or workshop.',
    EDIT_EVENT_SUBTITLE: 'Update schedule, location, or description',
    LOGIN_REQUIRED_RSVP: 'Login to RSVP for this meetup',
  },
  PLACEHOLDERS: {
    EVENT_TITLE: 'e.g. AI & Next.js Architecture Meetup',
    EVENT_LOCATION: 'e.g. Dexqbit HQ, Tech Park',
    EVENT_DESCRIPTION: 'Describe the meetup agenda, speakers, and topics...',
    EMAIL: 'sarah@dexqbit.com',
  },
} as const;
