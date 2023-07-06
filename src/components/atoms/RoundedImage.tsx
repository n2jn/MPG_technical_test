import React from 'react';
import {Image, ImageProps, StyleSheet, View} from 'react-native';
import {useImage} from '~hooks/useImage';

type AcceptableImageSize = 8 | 16 | 24 | 32 | 64;

type RoundedImageProps = Omit<ImageProps, 'source'> & {
  image?: string;
  size?: AcceptableImageSize;
};

export const RoundedImage = ({
  image,
  size = 16,
  ...imageProps
}: RoundedImageProps) => {
  const {onError, source, style} = useImage(image, size);

  return (
    <View style={[styles.container, style]}>
      <Image
        resizeMode="contain"
        source={source}
        onError={onError}
        style={style}
        {...imageProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
  },
});
