import {Pressable} from 'react-native';
import Animated, {Extrapolation} from 'react-native-reanimated';

export const EXTRAPOLATION_CLAMP = {
  extrapolateLeft: Extrapolation.CLAMP,
  extrapolateRight: Extrapolation.CLAMP,
};

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
