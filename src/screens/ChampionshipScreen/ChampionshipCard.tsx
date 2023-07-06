import {Pressable, PressableProps, StyleSheet} from 'react-native';
import {Label} from '~components/atoms/Label';
import {Row} from '~components/atoms/Row';
import {Sizing} from '~helper/sizing';
import useThemedStyled from '~hooks/useThemeStyled';
import {ColorTokens, Theme} from '~theme/model/theme.interface';

interface ChampionshipCardProps {
  title: string;
  onPress: PressableProps['onPress'];
}

const ChampionshipCard: React.FC<ChampionshipCardProps> = ({
  title,
  onPress,
}) => {
  const styles = useThemedStyled(championshipCardStyles);
  return (
    <Pressable onPress={onPress}>
      <Row style={styles.rowContainer}>
        <Label style={styles.text} text={title} />
      </Row>
    </Pressable>
  );
};

const championshipCardStyles = (theme: Theme, _: ColorTokens) =>
  StyleSheet.create({
    rowContainer: {
      backgroundColor: theme.palette.neutral.dark,
      padding: Sizing.x30,
      margin: Sizing.x10,
      borderRadius: 10,
      borderColor: theme.palette.secondary,
      borderWidth: 1,
    },
    text: {
      color: theme.palette.text,
    },
  });

export default ChampionshipCard;
