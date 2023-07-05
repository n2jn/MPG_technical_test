import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {Pressable, View} from 'react-native';
import {getClubList} from './api/club';
import {useLoadable} from './hooks/useLoadable';
import {Club} from './model/club.interface';

function App(): JSX.Element {
  const {loading, data, handler: fetchClubList} = useLoadable(getClubList);

  const clubList = useMemo(
    () => Object.values(data?.championshipClubs || {}),
    [data],
  );

  useEffect(() => {
    fetchClubList();
  }, []);

  const renderItem = useCallback(({item}: {item: Club}) => {
    return (
      <Pressable onPress={() => console.log('pressed')}>
        <View
          style={{
            width: '100%',
            height: 100,
            borderColor: 'red',
            borderWidth: 1,
          }}></View>
      </Pressable>
    );
  }, []);

  return (
    <>
      <FlashList
        onRefresh={fetchClubList}
        refreshing={loading}
        keyExtractor={(item: Club) => item.id}
        data={clubList}
        estimatedItemSize={100}
        renderItem={renderItem}
      />
    </>
  );
}

export default App;
