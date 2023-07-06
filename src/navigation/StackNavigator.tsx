import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChampionshipsScreen from '~screens/ChampionshipScreen';
import PlayerDetailsScreen from '~screens/PlayerDetailScreen';
import PlayersScreen from '~screens/PlayersScreen';
import useTheme from '~hooks/useTheme';
import {useCallback, useMemo} from 'react';
import Icon from '~components/atoms/Icon';
import {Sizing} from '~helper/sizing';
import {
  HeaderBackButtonProps,
  HeaderButtonProps,
} from '@react-navigation/native-stack/lib/typescript/src/types';
import {View} from 'react-native';
import NavigationButton from '~components/molecules/NavigationHeader';
import NavigationHeader from '~components/molecules/NavigationHeader';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  const [theme, _, changeTheme] = useTheme();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.palette.primary,
      background: theme.palette.background,
      card: theme.palette.card,
      text: theme.palette.text,
      border: theme.palette.secondary,
    },
  };

  const GoBackHeader = useCallback((props: HeaderButtonProps) => {
    return <NavigationHeader {...props} icon={'back'} goBackOnPress />;
  }, []);

  const ThemeModeHeader = useCallback(
    (props: HeaderBackButtonProps) => {
      const newMode = theme.palette.mode === 'dark' ? 'light' : 'dark';

      return (
        <NavigationHeader
          {...props}
          icon={newMode}
          onPress={() => changeTheme?.(newMode)}
        />
      );
    },
    [theme.palette.mode],
  );

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Championships">
        <Stack.Screen
          name="Championships"
          component={ChampionshipsScreen}
          options={{
            headerTitle: 'List des championnats',
            headerRight: ThemeModeHeader,
          }}
        />
        <Stack.Screen
          name="PlayerDetails"
          component={PlayerDetailsScreen}
          options={{
            headerLeft: GoBackHeader,
            headerTitle: 'Details',
            headerRight: ThemeModeHeader,
          }}
        />
        <Stack.Screen
          name="Players"
          component={PlayersScreen}
          options={{
            headerLeft: GoBackHeader,
            headerTitle: 'List des joueurs',
            headerRight: ThemeModeHeader,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
