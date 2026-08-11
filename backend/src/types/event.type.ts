import { IUserResponse } from './user.type.js';

/**
 * Represents a Meetup Event domain entity.
 */
export interface IEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  event_date: Date | string;
  max_capacity: number;
  created_by: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IEventDetail extends IEvent {
  creator?: IUserResponse;
  rsvp_summary?: {
    going: number;
    maybe: number;
    declined: number;
  };
  user_rsvp_status?: string | null;
}
