export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: number;
  quotation: number;
  clubId: string;
  stats: {
    averageRating: number;
    totalGoals: number;
    totalMatches: number;
    totalStartedMatches: number;
    totalPlayedMatches: number;
  };
}

export interface PoolPlayer {
  poolPlayers: Player[];
}

export interface StatsMatch {
  away: {
    clubId: string;
    score: 0;
  };
  date: string;
  gameWeekNumber: number;
  home: {
    clubId: string;
    score: number;
  };
  matchId: string;
  playerClubId: string;
  playerPerformance: {
    goals: number;
    minutesPlayed: number;
    ownGoals: number;
    rating: number;
    status: 1;
  };
}

export interface PlayerStatsChampionship {
  averagePercentRanks: {
    averageRating: number;
    percentageCleanSheet: number;
    percentageStarter: number;
    quotation: number;
    ratioGoalsConceded: number;
    ratioInterceptions: number;
  };
  clubs: Record<
    string,
    {
      matches: any;
      quotations: any;
      stats: any;
    }
  >;
  keySeasonStats: {
    averageRating: number;
    percentageCleanSheet: number;
    percentageStarter: number;
    quotation: number;
    ratioGoalsConceded: number;
    ratioInterceptions: number;
  };
  [club in string]: {
    joinDate: string;
    stats: any;
  };
  percentRanks: {
    averageRating: number;
    percentageCleanSheet: number;
    percentageStarter: number;
    quotation: number;
    ratioGoalsConceded: number;
    ratioInterceptions: number;
  };
  total: {
    matches: StatsMatch[];
    stats: {
      averageRating: number;
      totalAccurateCross: number;
      totalAccurateLongPass: number;
      totalAccuratePass: number;
      totalAccuratePassBackZone: number;
      totalAccuratePassFwdZone: number;
      totalBigChanceCreated: number;
      totalBigChanceMissed: number;
      totalCleanSheet: number;
      totalContest: number;
      totalCross: number;
      totalDuel: number;
      totalFouled: number;
      totalFouls: number;
      totalGoalAssist: number;
      totalGoals: number;
      totalGoalsConceded: number;
      totalIntercept: number;
      totalLongPass: number;
      totalLostBall: number;
      totalMinutesPlayed: number;
      totalMistake: number;
      totalOwnGoals: number;
      totalPassBackZone: number;
      totalPassFwdZone: number;
      totalPasses: number;
      totalPenalties: number;
      totalPenaltiesScored: number;
      totalPlayedMatches: number;
      totalRedCard: number;
      totalScoringAtt: number;
      totalShotOffTarget: number;
      totalStartedMatches: number;
      totalTackle: number;
      totalTouches: number;
      totalWonContest: number;
      totalWonDuel: number;
      totalYellowCard: number;
    };
  };
}

export interface PlayerStats {
  championships: Record<number, PlayerStatsChampionship>;
  id: string;
  position: number;
  type: string;
  ultraPosition: number;
}
