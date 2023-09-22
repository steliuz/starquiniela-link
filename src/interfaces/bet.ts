import { Match } from './match';
import { User } from './user';

export interface Bet {
  id?: number;
  match_id: number;
  user_id: number;
  goalsTeam1: number;
  goalsTeam2: number;
  points: number;
  index: number;
  paid: number;
  matches?: Match[];
  length?: number;
  user?: User;
  ticket_factura?: string;
}

export interface PaidBet extends Bet {
  room_id: number | string | null;
}
