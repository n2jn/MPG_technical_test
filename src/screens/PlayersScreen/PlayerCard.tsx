import {Pressable, StyleSheet, View} from 'react-native';
import {RoundedImage} from '../../components/atoms/RoundedImage';
import {Label} from '../../components/atoms/Label';
import useThemedStyled from '~hooks/useThemeStyled';
import {ColorTokens, Theme} from '~theme/model/theme.interface';
import {Row} from '../../components/atoms/Row';
import {Player} from '~api/model/player.interface';
import {Club} from '~api/model/club.interface';
import {PLAYER_POSITIONS_NAME} from '~api/mocks/PlayerPositions';
import {Sizing} from '~helper/sizing';

interface PlayerCardProps {
  onPress: () => void;
  player: Player;
  club?: Club;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  club,
  onPress,
}) => {
  const styles = useThemedStyled(PlayersStyles);

  const playerPosition =
    PLAYER_POSITIONS_NAME[
      player.ultraPosition as keyof typeof PLAYER_POSITIONS_NAME
    ] || {};

  return (
    <Pressable onPress={onPress} style={styles.rowContainer}>
      {/** Card Header (player information) */}
      <View style={styles.topLeftContainer}>
        {/* Club logo */}
        <View style={{flexShrink: 1}}>
          <RoundedImage size={32} image={club?.defaultAssets?.logo.small} />
        </View>
        {/* Player/Club name  */}
        <View style={{flex: 1}}>
          <Label text={`${player.firstName} ${player.lastName}`} />
          <Label text={club?.name['fr-FR']!} />
        </View>
        {/* Player position label  */}
        <View style={{flexShrink: 1}}>
          <Label style={styles.textCell} text={playerPosition.title} />
          <Label style={styles.textCell} text={playerPosition.short} />
        </View>
        {/* Club jersey and position number  */}
        <View style={{flexShrink: 1}}>
          <RoundedImage size={32} image={club?.defaultJerseyUrl} />
          <Label style={styles.textCell} text={player.position} />
        </View>
      </View>

      {/** Card Body (player stats) */}
      <View style={styles.textContainer}>
        <Row>
          <Label style={styles.textCell} text={'cote'} />
          <Label style={styles.textCell} text={'Buts'} />
          <Label style={styles.textCell} text={'Matchs'} />
          <Label style={styles.textCell} text={'Played Match'} />
          <Label style={styles.textCell} text={'Tit'} />
        </Row>
        <Row>
          <Label style={styles.textCell} text={player.quotation} />
          <Label style={styles.textCell} text={player.stats.totalGoals} />
          <Label style={styles.textCell} text={player.stats.totalMatches} />
          <Label
            style={styles.textCell}
            text={player.stats.totalPlayedMatches}
          />
          <Label
            style={styles.textCell}
            text={player.stats.totalStartedMatches}
          />
        </Row>
      </View>
    </Pressable>
  );
};

const PlayersStyles = (theme: Theme, _: ColorTokens) =>
  StyleSheet.create({
    rowContainer: {
      borderColor: theme.palette.secondary,
      borderWidth: 1,
      borderRadius: 10,
      margin: Sizing.x10,
      paddingVertical: Sizing.x10,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.palette.neutral.dark,
    },
    textContainer: {
      padding: Sizing.x10,
    },
    textCell: {
      textAlign: 'center',
    },
    chartCell: {
      flex: 1,
      minHeight: 50,
    },
    topLeftContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: Sizing.x10,
      paddingTop: Sizing.x10,
      paddingHorizontal: Sizing.x30,
    },
  });
