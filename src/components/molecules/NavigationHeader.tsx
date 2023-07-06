import {useNavigation} from '@react-navigation/native';
import {HeaderButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon, {AcceptableIconName} from '~components/atoms/Icon';
import {Label} from '~components/atoms/Label';
import {Sizing} from '~helper/sizing';
import useTheme from '~hooks/useTheme';

interface NavigationHeaderProps extends HeaderButtonProps {
  label?: string;
  icon?: AcceptableIconName;
  onPress?: () => void;
  goBackOnPress?: boolean;
}

const NavigationHeader = ({
  label,
  icon,
  onPress,
  goBackOnPress,
  canGoBack,
}: NavigationHeaderProps) => {
  const [theme, _] = useTheme();
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    if (!!goBackOnPress && canGoBack) {
      navigation.goBack();
    } else {
      onPress?.();
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      {!!icon && (
        <Icon
          onPress={handlePress}
          name={icon}
          size={Sizing.x50}
          color={theme.palette.text}
        />
      )}
      {!!label && <Label text={label}></Label>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Sizing.x10,
  },
});

export default NavigationHeader;
