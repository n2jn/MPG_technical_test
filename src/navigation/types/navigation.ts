import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Championships: {};
  PlayerDetails: {
    playerId: string;
    championshipId: number;
    clubId: string;
    year?: number;
  };
  Players: {
    championshipId: number;
  };
};

export type ChampionshipListProps = NativeStackScreenProps<
  RootStackParamList,
  'Championships'
>;
export type PlayerDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'PlayerDetails'
>;

export type PlayerListProps = NativeStackScreenProps<
  RootStackParamList,
  'Players'
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
