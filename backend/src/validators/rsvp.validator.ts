import { z } from 'zod';
import { RSVP_STATUS } from '../constants/rsvp-status.constant';

export const upsertRsvpSchema = z.object({
  status: z.enum([RSVP_STATUS.GOING, RSVP_STATUS.MAYBE, RSVP_STATUS.DECLINED], {
    errorMap: () => ({ message: 'Status must be going, maybe, or declined' }),
  }),
});

export type UpsertRsvpInput = z.infer<typeof upsertRsvpSchema>;
