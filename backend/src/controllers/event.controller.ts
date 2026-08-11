import { Request, Response, NextFunction } from 'express';
import { EventService } from '../services/event.service';
import { getBackendConstants } from '../constants';

const eventService = new EventService();
const constants = getBackendConstants();

/**
 * Controller handling Meetup Event listing, creation, updates, and deletion.
 */
export async function getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const category = req.query[constants.QUERY.CATEGORY] as string | undefined;
    const search = req.query[constants.QUERY.SEARCH] as string | undefined;
    const events = await eventService.getEvents(category, search);
    res.status(constants.HTTP_STATUS.OK).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
}

export async function getEventById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    const userId = req.user?.id;
    const event = await eventService.getEventById(id, userId);

    if (!event) {
      res.status(constants.HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: constants.MESSAGES.EVENT.NOT_FOUND,
      });
      return;
    }

    res.status(constants.HTTP_STATUS.OK).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
}

export async function createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const eventData = { ...req.body, created_by: userId };
    const event = await eventService.createEvent(eventData);
    res.status(constants.HTTP_STATUS.CREATED).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
}

export async function updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    const userId = req.user!.id;
    const event = await eventService.updateEvent(id, userId, req.body);
    res.status(constants.HTTP_STATUS.OK).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
}

export async function deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    const userId = req.user!.id;
    await eventService.deleteEvent(id, userId);
    res.status(constants.HTTP_STATUS.OK).json({
      success: true,
      message: constants.MESSAGES.EVENT.DELETED_SUCCESS,
    });
  } catch (error) {
    next(error);
  }
}
