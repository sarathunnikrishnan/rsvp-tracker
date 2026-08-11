/**
 * Centralized API endpoints for frontend service calls.
 */
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    DEMO_USERS: '/auth/demo-users',
    ME: '/auth/me',
  },
  EVENTS: {
    LIST: (query?: string) => (query ? `/events?${query}` : '/events'),
    CREATE: '/events',
    BY_ID: (id: string | number) => `/events/${id}`,
  },
  RSVPS: {
    UPSERT: (eventId: string | number) => `/rsvps/${eventId}`,
    ATTENDEES: (eventId: string | number) => `/rsvps/${eventId}/attendees`,
  },
} as const;
