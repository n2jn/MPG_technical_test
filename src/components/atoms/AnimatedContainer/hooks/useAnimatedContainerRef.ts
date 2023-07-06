import {Ref, useImperativeHandle, useRef} from 'react';
import {AnimatedContainerRefType} from '../type';

export const useAnimatedContainerRef = <T extends unknown>(
  ref: Ref<AnimatedContainerRefType>,
  customRefFunction?: Partial<AnimatedContainerRefType>,
) => {
  const viewRef = useRef<T>(null);

  useImperativeHandle(
    ref,
    () => ({
      showContent: _ => {
        'worklet';
      },
      ...(customRefFunction ?? {}),
    }),
    [viewRef],
  );

  return viewRef;
};
