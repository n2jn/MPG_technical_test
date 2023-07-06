import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {AnimatedContainerChildrenProps} from '../atoms/AnimatedContainer';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AnimatedContainerRefType} from '~components/atoms/AnimatedContainer/type';
import {useAnimatedContainerRef} from '~components/atoms/AnimatedContainer/hooks/useAnimatedContainerRef';
import Tags, {TagItem} from '~components/atoms/Tags';
import useTheme from '~hooks/useTheme';
import {EXTRAPOLATION_CLAMP} from '~helper/animation';
import {Sizing} from '~helper/sizing';

export interface TagListProps extends AnimatedContainerChildrenProps {
  tags: TagItem[];
  selectedTags?: number[];
  onTagPress: (id: number) => void;
}

const TagList = (
  {tags, onTagPress, onLayout, selectedTags}: TagListProps,
  ref: React.ForwardedRef<AnimatedContainerRefType>,
) => {
  const [_, colors] = useTheme();

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
      {tags.map((tag, index) => {
        return (
          <Pressable key={index} onPress={() => onTagPress(tag.id)}>
            <Tags
              {...tag}
              style={{
                backgroundColor: selectedTags?.includes(tag.id)
                  ? colors.blueAccent[700]
                  : 'transparent',
              }}
            />
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Sizing.x60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default React.forwardRef(TagList);
