import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {
  ActivityIndicator,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';
import {useLoadable} from '~hooks/useLoadable';
import {PlayerListProps} from '~navigation/types';
import {Player} from '~api/model/player.interface';
import {getPlayerList} from '~api/player';
import {getClubList} from '~api/club';
import {PlayerCard} from '~screens/PlayersScreen/PlayerCard';
import {useSharedValue} from 'react-native-reanimated';
import {PLAYER_POSITIONS_NAME} from '~api/mocks/PlayerPositions';
import {TagItem} from '~components/atoms/Tags';
import Filters, {FilterDisplayState} from '~components/organisme/Filters';

const PlayersScreen: React.FC<PlayerListProps> = ({navigation, route}) => {
  const {championshipId} = route.params;
  const filterDisplayState = useSharedValue<FilterDisplayState>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  /** Fetching Player API Data */
  const {
    loading: playersLoading,
    data: playersData,
    handler: fetchPlayerList,
  } = useLoadable(getPlayerList);

  /** Fetching Club API Data */
  const {
    loading: clubsLoading,
    data: clubData,
    handler: fetchClubList,
  } = useLoadable(getClubList);

  /** Fetching Position Mocked data */
  const positionTags = useMemo(
    () =>
      Object.values(PLAYER_POSITIONS_NAME).reduce((acc, curr, index) => {
        acc.push({
          index,
          id: curr.id,
          label: curr.short,
        });
        return acc;
      }, [] as TagItem[]),
    [],
  );

  useEffect(() => {
    fetchPlayerList(championshipId);
    fetchClubList();
  }, []);

  const playerList = useMemo(
    () =>
      Object.values(playersData?.poolPlayers || {}).filter(player => {
        const filterByText =
          player.firstName?.includes(searchText) ||
          player.lastName?.includes(searchText);

        const filterByTags = selectedTags.includes(player.ultraPosition);

        return selectedTags.length > 0
          ? filterByText && filterByTags
          : filterByText;
      }),
    [playersData, searchText, selectedTags],
  );

  const clubList = useMemo(
    () =>
      Object.values(clubData?.championshipClubs || {}).filter(clubs =>
        Object.keys(clubs.championships).filter(
          id => parseInt(id) === championshipId,
        ),
      ),
    [clubData, searchText],
  );

  const getPlayerClub = useCallback(
    (playeClubId: string) =>
      clubList.find(club => club.id.endsWith(playeClubId)),
    [clubList],
  );

  const onPlayerPress = useCallback(
    (id: string, clubId: string) => {
      navigation.navigate('PlayerDetails', {
        playerId: id,
        clubId,
        championshipId,
      });
    },
    [championshipId],
  );

  const renderPlayerCard = useCallback(
    ({item, index}: {item: Player; index: number}) => {
      const club = getPlayerClub(item.clubId);
      return (
        <PlayerCard
          key={index}
          club={club}
          player={item}
          onPress={() => onPlayerPress(item.id, item.clubId)}
        />
      );
    },
    [clubList],
  );

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleTagPress = useCallback(
    (tagId: number) => {
      const isAlreadySelected = selectedTags.includes(tagId);
      if (isAlreadySelected) {
        setSelectedTags(selectedTags.filter(t => t !== tagId));
      } else {
        setSelectedTags([...selectedTags, tagId]);
      }
    },
    [selectedTags],
  );

  const handleEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      /** Depending on the platform the value is inverted, weird stuff */
      if (event.nativeEvent.velocity && event.nativeEvent.velocity?.y > 0) {
        /** scrolling Down */
        filterDisplayState.value = Platform.OS === 'ios' ? 0 : 1;
      } else {
        /** scrolling Up */
        filterDisplayState.value = Platform.OS === 'ios' ? 1 : 0;
      }
    },
    [],
  );

  const handleBeginDrag = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  if (clubsLoading || playersLoading) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  return (
    <>
      <Filters
        displayState={filterDisplayState}
        onSearch={handleSearch}
        onTagPress={handleTagPress}
        tags={positionTags}
        selectedTags={selectedTags}
      />
      <FlashList
        removeClippedSubviews={true}
        keyExtractor={(item: Player) => item.id}
        data={playerList}
        estimatedItemSize={200}
        onScrollBeginDrag={handleBeginDrag}
        onScrollEndDrag={handleEndDrag}
        renderItem={renderPlayerCard}
      />
    </>
  );
};

export default PlayersScreen;
