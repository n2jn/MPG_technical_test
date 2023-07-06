import React from 'react';
import {PressableProps, StyleSheet, TextInputProps} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AnimatedContainerChildrenProps} from '~components/atoms/AnimatedContainer';
import {useAnimatedContainerRef} from '~components/atoms/AnimatedContainer/hooks/useAnimatedContainerRef';
import {AnimatedContainerRefType} from '~components/atoms/AnimatedContainer/type';
import Icon from '~components/atoms/Icon';
import Input from '~components/atoms/Input';
import {EXTRAPOLATION_CLAMP} from '~helper/animation';
import {Sizing} from '~helper/sizing';
import useTheme from '~hooks/useTheme';

export interface SearchBarProps extends AnimatedContainerChildrenProps {
  onChangeText: TextInputProps['onChangeText'];
  onIconPress: PressableProps['onPress'];
}

const SearchBar = (
  {onChangeText, onIconPress, onLayout}: SearchBarProps,
  ref: React.ForwardedRef<AnimatedContainerRefType>,
) => {
  const [theme] = useTheme();
  const tagOpacity = useSharedValue(1);

  const viewRef = useAnimatedContainerRef<Animated.View>(ref, {
    showContent: (value: boolean) => {
      'worklet';
      tagOpacity.value = +value;
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(
      interpolate(tagOpacity.value, [0, 1], [0, 1], EXTRAPOLATION_CLAMP),
      {duration: 250},
    ),
  }));

  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
      onLayout={onLayout}
      ref={viewRef}>
      <Input onChangeText={onChangeText} />
      <Icon
        name={'filter'}
        size={Sizing.x60}
        color={theme.palette.text}
        onPress={onIconPress}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Sizing.x60,
    flexDirection: 'row',
  },
});

export default React.forwardRef(SearchBar);
