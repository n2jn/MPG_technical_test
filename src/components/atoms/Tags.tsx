import {Pressable, StyleSheet, View, ViewProps} from 'react-native';
import {Label} from './Label';
import {ColorTokens, Theme} from '~theme/model/theme.interface';
import useThemedStyled from '~hooks/useThemeStyled';
import {Sizing} from '~helper/sizing';

export interface TagItem {
  index: number;
  label: string;
  id: number;
}

export interface TagsProps extends TagItem {
  style: ViewProps['style'];
}

const Tags: React.FC<TagsProps> = ({label, style: propStyle}) => {
  const styles = useThemedStyled(tagStyles);

  return (
    <View style={[styles.container, propStyle]}>
      <Label text={label} />
    </View>
  );
};

const tagStyles = (theme: Theme, _: ColorTokens) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 50,
      borderColor: theme.palette.secondary,
      paddingHorizontal: Sizing.x20,
      paddingVertical: Sizing.x10,
    },
  });

export default Tags;
