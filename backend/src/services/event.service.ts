import { RowDataPacket } from 'mysql2/promise';
import { BaseService } from './base.service';
import { BACKEND_CONSTANTS } from '../constants';
import { IEvent, IEventDetail } from '../types/event.type';
import { formatMysqlDateTime } from '../helpers';

/**
 * Handles Meetup Event CRUD operations, ownership verification, and statistics.
 */
export class EventService extends BaseService {
  public async getEvents(category?: string, search?: string): Promise<IEventDetail[]> {
    let sql = `
      SELECT 
        e.*,
        u.name as creator_name,
        u.email as creator_email,
        u.avatar_url as creator_avatar,
        COUNT(CASE WHEN r.status = '${BACKEND_CONSTANTS.RSVP_STATUS.GOING}' THEN 1 END) as going_count,
        COUNT(CASE WHEN r.status = '${BACKEND_CONSTANTS.RSVP_STATUS.MAYBE}' THEN 1 END) as maybe_count,
        COUNT(CASE WHEN r.status = '${BACKEND_CONSTANTS.RSVP_STATUS.DECLINED}' THEN 1 END) as declined_count
      FROM events e
      JOIN users u ON e.created_by = u.id
      LEFT JOIN rsvps r ON e.id = r.event_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (category) {
      sql += ' AND e.category = ?';
      params.push(category);
    }

    if (search) {
      sql += ' AND (e.title LIKE ? OR e.location LIKE ? OR e.description LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    sql += ' GROUP BY e.id ORDER BY e.event_date ASC';

    const rows = await this.query<RowDataPacket[]>(sql, params);

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      location: row.location,
      category: row.category,
      event_date: row.event_date,
      max_capacity: row.max_capacity,
      created_by: row.created_by,
      created_at: row.created_at,
      creator: {
        id: row.created_by,
        name: row.creator_name,
        email: row.creator_email,
        avatar_url: row.creator_avatar,
      },
      rsvp_summary: {
        going: parseInt(row.going_count || '0', 10),
        maybe: parseInt(row.maybe_count || '0', 10),
        declined: parseInt(row.declined_count || '0', 10),
      },
    }));
  }

  public async getEventById(id: number, currentUserId?: number): Promise<IEventDetail | null> {
    const sql = `
      SELECT 
        e.*,
        u.name as creator_name,
        u.email as creator_email,
        u.avatar_url as creator_avatar,
        COUNT(CASE WHEN r.status = '${BACKEND_CONSTANTS.RSVP_STATUS.GOING}' THEN 1 END) as going_count,
        COUNT(CASE WHEN r.status = '${BACKEND_CONSTANTS.RSVP_STATUS.MAYBE}' THEN 1 END) as maybe_count,
        COUNT(CASE WHEN r.status = '${BACKEND_CONSTANTS.RSVP_STATUS.DECLINED}' THEN 1 END) as declined_count
      FROM events e
      JOIN users u ON e.created_by = u.id
      LEFT JOIN rsvps r ON e.id = r.event_id
      WHERE e.id = ?
      GROUP BY e.id
    `;

    const rows = await this.query<RowDataPacket[]>(sql, [id]);
    if (rows.length === 0) return null;

    const row = rows[0];

    let user_rsvp_status = null;
    if (currentUserId) {
      const userRsvp = await this.query<RowDataPacket[]>(
        'SELECT status FROM rsvps WHERE event_id = ? AND user_id = ?',
        [id, currentUserId]
      );
      if (userRsvp.length > 0) {
        user_rsvp_status = userRsvp[0].status;
      }
    }

    return {
      id: row.id,
      title: row.title,
      description: row.description,
      location: row.location,
      category: row.category,
      event_date: row.event_date,
      max_capacity: row.max_capacity,
      created_by: row.created_by,
      created_at: row.created_at,
      creator: {
        id: row.created_by,
        name: row.creator_name,
        email: row.creator_email,
        avatar_url: row.creator_avatar,
      },
      rsvp_summary: {
        going: parseInt(row.going_count || '0', 10),
        maybe: parseInt(row.maybe_count || '0', 10),
        declined: parseInt(row.declined_count || '0', 10),
      },
      user_rsvp_status,
    };
  }

  public async createEvent(
    data: Omit<IEvent, 'id' | 'created_at' | 'updated_at'>
  ): Promise<IEventDetail> {
    const mysqlFormattedDate = formatMysqlDateTime(data.event_date);

    const result = await this.execute(
      `INSERT INTO events (title, description, location, category, event_date, max_capacity, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.title,
        data.description,
        data.location,
        data.category,
        mysqlFormattedDate,
        data.max_capacity,
        data.created_by,
      ]
    );

    const event = await this.getEventById(result.insertId);
    if (!event) throw new Error(BACKEND_CONSTANTS.MESSAGES.EVENT.CREATION_FAILED);
    return event;
  }

  public async updateEvent(
    id: number,
    userId: number,
    data: Partial<Omit<IEvent, 'id' | 'created_by' | 'created_at' | 'updated_at'>>
  ): Promise<IEventDetail> {
    const existing = await this.getEventById(id);
    if (!existing) {
      throw new Error(BACKEND_CONSTANTS.MESSAGES.EVENT.NOT_FOUND);
    }

    // Strict Ownership Enforcement: Only creator can update
    if (existing.created_by !== userId) {
      const error: any = new Error(BACKEND_CONSTANTS.MESSAGES.EVENT.FORBIDDEN_UPDATE);
      error.statusCode = 403;
      throw error;
    }

    const updates: string[] = [];
    const params: any[] = [];

    if (data.title !== undefined) {
      updates.push('title = ?');
      params.push(data.title);
    }
    if (data.description !== undefined) {
      updates.push('description = ?');
      params.push(data.description);
    }
    if (data.location !== undefined) {
      updates.push('location = ?');
      params.push(data.location);
    }
    if (data.category !== undefined) {
      updates.push('category = ?');
      params.push(data.category);
    }
    if (data.event_date !== undefined) {
      updates.push('event_date = ?');
      params.push(formatMysqlDateTime(data.event_date));
    }
    if (data.max_capacity !== undefined) {
      updates.push('max_capacity = ?');
      params.push(data.max_capacity);
    }

    if (updates.length > 0) {
      params.push(id);
      await this.execute(`UPDATE events SET ${updates.join(', ')} WHERE id = ?`, params);
    }

    const updated = await this.getEventById(id, userId);
    return updated!;
  }

  public async deleteEvent(id: number, userId: number): Promise<void> {
    const existing = await this.getEventById(id);
    if (!existing) {
      throw new Error(BACKEND_CONSTANTS.MESSAGES.EVENT.NOT_FOUND);
    }

    // Strict Ownership Enforcement: Only creator can delete
    if (existing.created_by !== userId) {
      const error: any = new Error(BACKEND_CONSTANTS.MESSAGES.EVENT.FORBIDDEN_DELETE);
      error.statusCode = 403;
      throw error;
    }

    await this.execute('DELETE FROM events WHERE id = ?', [id]);
  }
}
