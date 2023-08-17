import { Match } from 'src/interfaces/match';
import { User } from './user';
export interface Room {
  name: string;
  type: number;
  status?: boolean;
  category_room_id: number;
  // price: number;
  // global: boolean;
  // fase: boolean;
  id?: number;
  matches?: Array<Match> | null;
  players?: Array<User> | null;
}
