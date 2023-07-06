import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {LayoutChangeEvent, PressableProps, ViewProps} from 'react-native';
import {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import useAnimatedDimension from './hooks/useAnimatedDimension';
import {AnimatedContainerRefType} from './type';
import {AnimatedPressable, EXTRAPOLATION_CLAMP} from '~helper/animation';

interface AnimatedContainerProps extends PressableProps {
  showChildren: SharedValue<number>;
  children: React.ReactNode[];
}

const AnimatedContainer = ({
  showChildren,
  children,
  onPress,
  ...pressableProps
}: AnimatedContainerProps) => {
  /** Get the sizes of the children components */
  const layoutSizes = new Array(children.length)
    .fill(0)
    .map(() => useAnimatedDimension());

  const onLayout = useCallback(
    (index: number) => (e: LayoutChangeEvent) => {
      const {height: h, width: w} = e.nativeEvent.layout;
      const lHeight = parseInt(h.toFixed(0));
      const lWidth = parseInt(w.toFixed(0));

      // will never be undefined, based on the length of the children
      layoutSizes[index]!.height.value = lHeight;
      layoutSizes[index]!.width.value = lWidth;
    },
    [],
  );

  /** Set up the animation for container  */
  const childrenIndexes = new Array(children.length)
    .fill(0)
    .map((_, index) => index + 1); // add plus one to count O children

  const containerOpacity = useDerivedValue(
    () => interpolate(showChildren.value, [0, 1], [0, 1], EXTRAPOLATION_CLAMP),
    [showChildren],
  );
  const containerMargin = useDerivedValue(
    () => interpolate(showChildren.value, [0, 1], [0, 8], EXTRAPOLATION_CLAMP),
    [showChildren],
  );

  const containerHeight = useDerivedValue(() => {
    let sum: number;
    /** add height of previous element to current element */
    const heightSteps = layoutSizes.map(
      elem => (sum = (sum ?? 0) + elem.height.value),
    );

    // add 0 to have a hidden state
    return interpolate(
      showChildren.value,
      [0, ...childrenIndexes],
      [0, ...heightSteps],
      EXTRAPOLATION_CLAMP,
    );
  }, [showChildren, layoutSizes]);

  const animatedContainerStyle = useAnimatedStyle(
    () => ({
      margin: withTiming(containerMargin.value),
      height: withTiming(containerHeight.value, {duration: 250}),
      opacity: withTiming(containerOpacity.value, {duration: 250}),
    }),
    [],
  );

  /** Set up the animation based for children  */
  const childRefs = new Array(children.length)
    .fill(0)
    .map(() => useRef<AnimatedContainerRefType | null>(null));

  const getRef = useCallback(
    (index: number) => (n: AnimatedContainerRefType) => {
      childRefs[index]!.current = n;
    },
    [],
  );

  useDerivedValue(() => {
    childRefs.forEach((ref, index) => {
      ref.current?.showContent(index + 1 <= showChildren.value);
    });
  }, [showChildren]);

  /* Inject props for layout and ref in children  */
  const childrenWithInjectedProps = useMemo(
    () =>
      React.Children.map(children, (child, index) =>
        React.cloneElement(
          child as React.ReactElement<
            any,
            string | React.JSXElementConstructor<any>
          >,
          {
            ref: getRef(index),
            onLayout: onLayout(index),
          },
        ),
      ),
    [children],
  );

  return (
    <AnimatedPressable
      disabled={!onPress}
      onPress={onPress}
      style={animatedContainerStyle}
      {...pressableProps}>
      {childrenWithInjectedProps}
    </AnimatedPressable>
  );
};

export default AnimatedContainer;
