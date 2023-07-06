import {StyleSheet, Text, TextProps} from 'react-native';
import useThemedStyled from '~hooks/useThemeStyled';
import {ColorTokens, Theme} from '~theme/model/theme.interface';

type LabelProps = TextProps & {
  text: string | number;
};

export const Label: React.FC<LabelProps> = ({text, style, ...textProps}) => {
  const styles = useThemedStyled(labelStyles);

  return (
    <Text {...textProps} style={[styles.primary, style]}>
      {text}
    </Text>
  );
};

const labelStyles = (theme: Theme, _: ColorTokens) =>
  StyleSheet.create({
    primary: {
      fontSize: theme.typography.h6.fontSize,
      fontWeight: '600',
      color: theme.palette.text,
    },
  });
