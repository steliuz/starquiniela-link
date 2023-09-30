import { Match } from 'src/interfaces/match';
import { Player } from './user';
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
  players?: Array<Player> | null;
  room_user?: RoomUser;
  count_player?: number;
}

export interface RoomUser {
  room_id: number;
  user_id: number;
  room_id_admin?: number | null;
  credits?: number;
  vip?: number;
  status?: number;
  cod_compartir?: string;
  limit_player: number;
}
