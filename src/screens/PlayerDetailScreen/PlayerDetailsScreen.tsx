import React, {useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useLoadable} from '~hooks/useLoadable';
import {getPlayerList, getPlayerStats} from '~api/player';
import {PlayerDetailsProps} from '~navigation/types';
import {getClubList} from '~api/club';
import {RoundedImage} from '~components/atoms/RoundedImage';
import {Label} from '~components/atoms/Label';
import {PLAYER_POSITIONS_NAME} from '~api/mocks/PlayerPositions';
import DetailCard from '~screens/PlayerDetailScreen/DetailCard';
import {Sizing} from '~helper/sizing';

const PlayerDetailsScreen: React.FC<PlayerDetailsProps> = ({route}) => {
  /** loading stats API Data */
  const {
    loading: playerStatsLoading,
    data: playerStats,
    handler: fetchPlayerStats,
  } = useLoadable(getPlayerStats);

  /** loading club API Data */
  const {
    loading: clubsLoading,
    data: clubMap,
    handler: fetchClubList,
  } = useLoadable(getClubList);

  /** loading Player API Data */
  const {
    loading: playerLoading,
    data: playerMap,
    handler: fetchPlayerList,
  } = useLoadable(getPlayerList);

  /** getting player position from Mock Data */
  const playerPosition = useMemo(
    () =>
      PLAYER_POSITIONS_NAME[
        player?.ultraPosition as keyof typeof PLAYER_POSITIONS_NAME
      ],
    [player],
  );

  /** fetching api data on mount */
  useEffect(() => {
    fetchPlayerStats(route.params.playerId, 2022);
    fetchPlayerList(route.params.championshipId);
    fetchClubList();
  }, []);

  const stats = useMemo(
    () => playerStats?.championships[route.params.championshipId],
    [playerStats],
  );

  const player = useMemo(
    () =>
      Object.values(playerMap?.poolPlayers || {}).find(
        p => p.id === route.params.playerId,
      ),
    [playerMap],
  );

  const club = useMemo(
    () =>
      Object.values(clubMap?.championshipClubs || {}).find(
        c => c.id === route.params.clubId,
      ),
    [clubMap],
  );

  if (playerStatsLoading || clubsLoading || playerLoading) {
    return <></>;
  }

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <RoundedImage image={club?.defaultAssets?.logo.medium} size={64} />
        <Label text={`${player?.firstName} ${player?.lastName}`} />
        <Label text={playerPosition?.title} />
      </View>
      <View>
        {/** AveragePercentRanks */}
        {stats?.averagePercentRanks && (
          <DetailCard objectToDisplay={stats?.averagePercentRanks} />
        )}

        {/** keySeasonStats */}
        {stats?.keySeasonStats && (
          <DetailCard objectToDisplay={stats?.keySeasonStats} />
        )}

        {/** percentRanks */}
        {stats?.percentRanks && (
          <DetailCard objectToDisplay={stats?.percentRanks} />
        )}

        {/** totals stats */}
        {stats?.total.stats && (
          <DetailCard objectToDisplay={stats?.total.stats} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: Sizing.x20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayerDetailsScreen;
