export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar_url?: string | null;
}

export interface IEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  event_date: string;
  max_capacity: number;
  created_by: number;
  created_at?: string;
  creator?: IUser;
  rsvp_summary?: {
    going: number;
    maybe: number;
    declined: number;
  };
  user_rsvp_status?: string | null;
}

export interface IAttendee {
  rsvp_id: number;
  status: 'going' | 'maybe' | 'declined';
  created_at: string;
  user: IUser;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}
