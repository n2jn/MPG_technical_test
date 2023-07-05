export interface Jerseys {}

export interface ChampionShips {
  active: boolean;
  jerseys: Jerseys;
}

export interface ClubName {
  'en-GB': string;
  'es-ES': string;
  'fr-FR': string;
}

export interface Club {
  id: string;
  name: ClubName;
  shortName: string;
  defaultAssets: Object;
  defaultJerseyUrl: string;
  chamionships: Record<string, ChampionShips>;
}

export interface ChampionshipClub {
  championshipClubs: Record<string, Club>;
}
