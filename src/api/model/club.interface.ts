export interface Jerseys {}

export interface ClubChampionShips {
  active: boolean;
  jerseys: Jerseys;
}

export interface ClubName {
  'en-GB': string;
  'es-ES': string;
  'fr-FR': string;
}

export interface ClubAssets {
  logo: {
    small: string;
    medium: string;
  };
}

export interface Club {
  id: string;
  name: ClubName;
  shortName: string;
  defaultAssets: ClubAssets | null;
  defaultJerseyUrl: string;
  championships: Record<string, ClubChampionShips>;
}

export interface ChampionshipClub {
  championshipClubs: Record<string, Club>;
}
