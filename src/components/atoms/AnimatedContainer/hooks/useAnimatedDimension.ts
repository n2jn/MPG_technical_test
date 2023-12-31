import {useSharedValue} from 'react-native-reanimated';
import type {SharedValue} from 'react-native-reanimated';

export type AnimatedDimensionObject = {
  width: SharedValue<number>;
  height: SharedValue<number>;
};

const useAnimatedDimension = (
  width: number = 0,
  height: number = 0,
): AnimatedDimensionObject => {
  const w = useSharedValue(width);
  const h = useSharedValue(height);

  return {
    width: w,
    height: h,
  };
};

export default useAnimatedDimension;
