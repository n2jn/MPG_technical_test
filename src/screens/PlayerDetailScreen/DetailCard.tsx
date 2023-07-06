import {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Label} from '~components/atoms/Label';
import {Sizing} from '~helper/sizing';
import useThemedStyled from '~hooks/useThemeStyled';
import {ColorTokens, Theme} from '~theme/model/theme.interface';

type DetailCardProps = {
  objectToDisplay: Record<string, number>;
};

const DetailCard: React.FC<DetailCardProps> = ({objectToDisplay}) => {
  const styles = useThemedStyled(detailStyles);

  return (
    <View style={styles.container}>
      {Object.keys(objectToDisplay).map((title, index) => {
        const firstLabel = title
          .replace(/([A-Z])/g, ' $1')
          .trim()
          .toUpperCase();

        const secondLabel = Number.isInteger(objectToDisplay[title])
          ? objectToDisplay[title]
          : objectToDisplay[title].toFixed(2);
        return (
          <View key={index} style={styles.rowContainer}>
            <Label style={styles.textCell} text={firstLabel} />
            <Label style={styles.textCell} text={secondLabel} />
          </View>
        );
      })}
    </View>
  );
};

const detailStyles = (theme: Theme, _: ColorTokens) =>
  StyleSheet.create({
    container: {
      margin: 8,
      padding: Sizing.x30,
      gap: Sizing.x10,
      borderWidth: 1,
      borderColor: theme.palette.secondary,
      borderRadius: 10,
      backgroundColor: theme.palette.neutral.dark,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textCell: {
      textAlign: 'center',
    },
  });

export default DetailCard;
