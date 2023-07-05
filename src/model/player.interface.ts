export interface PlayerStats {
  averageRating: number;
  totalGoals: number;
  totalMatches: number;
  totalStartedMatches: number;
  totalPlayedMatches: number;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: number;
  quotation: number;
  clubId: string;
  stats: PlayerStats;
}

export interface PoolPlayer {
  poolPlayers: Player[];
}
