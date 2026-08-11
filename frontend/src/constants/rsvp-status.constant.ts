/**
 * Allowed RSVP status values for frontend components.
 */
export const RSVP_STATUS = {
  GOING: 'going',
  MAYBE: 'maybe',
  DECLINED: 'declined',
} as const;

export type RsvpStatusType = (typeof RSVP_STATUS)[keyof typeof RSVP_STATUS];
