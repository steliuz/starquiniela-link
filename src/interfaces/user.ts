import { Bet } from './bet';
import { RoomUser } from './room';

export interface User {
  prefix: string;
  email?: string;
  name: string;
  password?: string;
  password_confirmation?: string;
  phone?: string | null;
  role_id: number | null;
  subscribe_id: number | null;
  referral_id?: number | string;
  id?: number;
  credits?: number;
  status?: boolean;
  emailUser: string;
}

export interface Player extends User {
  bets?: Bet[];
  rooms?: RoomUser[];
}
