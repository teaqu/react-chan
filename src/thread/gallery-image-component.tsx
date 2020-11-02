/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ImageProps } from 'react-native';
import FastImage from 'react-native-fast-image';

interface ImageDimensions {
  width: number;
  height: number;
}

export const GalleryImageComponent = (
  imageProps: ImageProps,
  imageDimensions: ImageDimensions,
  index: number
) => {
  console.log(imageProps);
  return (
    // @ts-ignore
    <FastImage {...imageProps} />
  );
};
