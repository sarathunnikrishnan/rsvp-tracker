/**
 * Represents a user domain entity.
 */
export interface IUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  avatar_url?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  avatar_url?: string | null;
}
