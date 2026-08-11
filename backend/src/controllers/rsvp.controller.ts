import { Request, Response, NextFunction } from 'express';
import { RsvpService } from '../services/rsvp.service';
import { getBackendConstants } from '../constants';

const rsvpService = new RsvpService();
const constants = getBackendConstants();

/**
 * Controller handling RSVP status creation, updates, and event attendee queries.
 */
export async function upsertRsvp(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const eventId = parseInt(req.params.eventId, 10);
    const userId = req.user!.id;
    const { status } = req.body;

    const result = await rsvpService.upsertRsvp(eventId, userId, status);
    res.status(constants.HTTP_STATUS.OK).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getAttendees(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const eventId = parseInt(req.params.eventId, 10);
    const attendees = await rsvpService.getAttendees(eventId);
    res.status(constants.HTTP_STATUS.OK).json({ success: true, data: attendees });
  } catch (error) {
    next(error);
  }
}
