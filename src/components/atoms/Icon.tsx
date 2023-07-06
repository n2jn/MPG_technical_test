import {Pressable, PressableProps, StyleSheet, View} from 'react-native';

/** svg images from ./assets, can access that thanks to react-native-svg-transformer */
import FilterIcon from '../../assets/filter.svg';
import DarkIcon from '../../assets/moon.svg';
import LightIcon from '../../assets/sun.svg';
import BackIcon from '../../assets/back-arrow.svg';

import {useMemo} from 'react';

export type AcceptableIconName = 'dark' | 'light' | 'filter' | 'back';

interface IconProps {
  name: AcceptableIconName;
  onPress: PressableProps['onPress'];
  size: number;
  color: string;
}

const Icon: React.FC<IconProps> = ({onPress, size, color, name}) => {
  const SvgIcon = useMemo(
    () =>
      name.includes('light')
        ? LightIcon
        : name.includes('dark')
        ? DarkIcon
        : name.includes('back')
        ? BackIcon
        : FilterIcon, // should do a switch, cleaner
    [name],
  );

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <SvgIcon width={size} height={size} fill={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Icon;
