import React, {useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import {SafeAreaView, StyleSheet} from 'react-native';
import {CHAMPIONSHIPS} from '~api/mocks/Championship';
import {ChampionshipListProps} from '~navigation/types';
import ChampionshipCard from './ChampionshipCard';

const ChampionshipsScreen: React.FC<ChampionshipListProps> = ({navigation}) => {
  const onItemPress = useCallback(
    (championshipId: number) => () => {
      navigation.navigate('Players', {
        championshipId,
      });
    },
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: (typeof CHAMPIONSHIPS)[0]}) => {
      return (
        <ChampionshipCard
          title={item.name['fr-FR']}
          onPress={onItemPress(item.id)}
        />
      );
    },
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        keyExtractor={(item: (typeof CHAMPIONSHIPS)[0]) => `${item.id}`}
        data={CHAMPIONSHIPS}
        estimatedItemSize={100}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChampionshipsScreen;
