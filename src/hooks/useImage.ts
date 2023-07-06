import {useCallback, useEffect, useMemo, useState} from 'react';
import {ImageSourcePropType} from 'react-native';

export const useImage = (image?: string, size: number = 999) => {
  const imageSource = useMemo(() => ({uri: image}), [image]);

  const [source, setSource] = useState<ImageSourcePropType>(imageSource);

  const onError = useCallback((e: any) => {
    console.log(e);
    setSource(placholderSource);
  }, []);

  const placholderSource = useMemo(
    () => ({
      uri: `https://dummyimage.com/${size}x${size}/000/ffffff.jpg&text=??`,
    }),
    [size],
  );

  useEffect(() => {
    setSource(image ? imageSource : placholderSource);
  }, [image]);

  const style = useMemo(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  return {
    onError,
    source,
    style,
  };
};
