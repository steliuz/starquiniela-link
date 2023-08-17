import { Team } from './team';

export interface Match {
  id?: number | null | undefined | string;
  name: string;
  team1?: Team | null;
  team2?: Team | null;
  goalsTeam1?: number | string;
  goalsTeam2?: number | string;
  penaltyTeam1?: number | string;
  penaltyTeam2?: number | string;
  status: boolean | number;
  fase?: number;
}

export interface MatchForm {
  room_id?: string | string[] | number | null;
  team1?: number | Team | null;
  team2?: number | Team | null;
}
