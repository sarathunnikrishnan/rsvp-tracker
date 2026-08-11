import { Router } from 'express';
import { upsertRsvp, getAttendees } from '../controllers/rsvp.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { upsertRsvpSchema } from '../validators/rsvp.validator';

const router = Router();

router.get('/:eventId/attendees', getAttendees);
router.post('/:eventId', authenticate, validate(upsertRsvpSchema), upsertRsvp);

export default router;
