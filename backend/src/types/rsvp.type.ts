import { RsvpStatusType } from '../constants/rsvp-status.constant.js';
import { IUserResponse } from './user.type.js';

/**
 * Represents an RSVP entity.
 */
export interface IRsvp {
  id: number;
  event_id: number;
  user_id: number;
  status: RsvpStatusType;
  created_at?: Date;
  updated_at?: Date;
}

export interface IAttendee {
  rsvp_id: number;
  status: RsvpStatusType;
  user: IUserResponse;
  created_at: Date | string;
}
