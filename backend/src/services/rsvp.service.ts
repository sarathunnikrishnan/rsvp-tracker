import { RowDataPacket } from 'mysql2/promise';
import { BaseService } from './base.service';
import {
  RsvpStatusType,
  BACKEND_CONSTANTS,
  getBackendConstants,
  getConstantValues,
} from '../constants';
import { IAttendee } from '../types/rsvp.type';

/**
 * Handles RSVP creation/updates and attendee list retrievals.
 */
export class RsvpService extends BaseService {
  public async upsertRsvp(
    eventId: number,
    userId: number,
    status: RsvpStatusType
  ): Promise<{ status: RsvpStatusType; event_id: number }> {
    const constants = getBackendConstants();
    const validStatuses = getConstantValues(constants.RSVP_STATUS);

    if (!validStatuses.includes(status)) {
      throw new Error(constants.MESSAGES.RSVP.INVALID_STATUS);
    }

    // 1. Verify event exists
    const events = await this.query<RowDataPacket[]>(
      'SELECT id, max_capacity FROM events WHERE id = ?',
      [eventId]
    );

    if (events.length === 0) {
      throw new Error(constants.MESSAGES.RSVP.EVENT_NOT_FOUND);
    }

    const event = events[0];

    // 2. Capacity Check if status is 'going' and user isn't already 'going'
    if (status === constants.RSVP_STATUS.GOING) {
      const existingRsvp = await this.query<RowDataPacket[]>(
        'SELECT status FROM rsvps WHERE event_id = ? AND user_id = ?',
        [eventId, userId]
      );

      const isAlreadyGoing =
        existingRsvp.length > 0 &&
        existingRsvp[0].status === constants.RSVP_STATUS.GOING;

      if (!isAlreadyGoing) {
        const goingCountRows = await this.query<RowDataPacket[]>(
          'SELECT COUNT(*) as count FROM rsvps WHERE event_id = ? AND status = ?',
          [eventId, constants.RSVP_STATUS.GOING]
        );
        const goingCount = parseInt(goingCountRows[0].count || '0', 10);

        if (goingCount >= event.max_capacity) {
          const error: any = new Error(constants.MESSAGES.RSVP.CAPACITY_REACHED);
          error.statusCode = 400;
          throw error;
        }
      }
    }

    // 3. Upsert RSVP
    await this.execute(
      `INSERT INTO rsvps (event_id, user_id, status)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE status = VALUES(status)`,
      [eventId, userId, status]
    );

    return { event_id: eventId, status };
  }

  public async getAttendees(eventId: number): Promise<IAttendee[]> {
    const constants = getBackendConstants();
    const [going, maybe, declined] = getConstantValues(constants.RSVP_STATUS);

    const rows = await this.query<RowDataPacket[]>(
      `SELECT 
        r.id as rsvp_id,
        r.status,
        r.created_at,
        u.id as user_id,
        u.name as user_name,
        u.email as user_email,
        u.avatar_url as user_avatar
      FROM rsvps r
      JOIN users u ON r.user_id = u.id
      WHERE r.event_id = ?
      ORDER BY FIELD(r.status, '${going}', '${maybe}', '${declined}'), u.name ASC`,
      [eventId]
    );

    return rows.map((row) => ({
      rsvp_id: row.rsvp_id,
      status: row.status as RsvpStatusType,
      created_at: row.created_at,
      user: {
        id: row.user_id,
        name: row.user_name,
        email: row.user_email,
        avatar_url: row.user_avatar,
      },
    }));
  }
}
