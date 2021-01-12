/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';
import { Post } from 'src/post/post';
import imageUtils from 'src/shared/utils/image-utils';

interface Props {
  post: Post;
  index: number;
}
export const GalleryImageComponent = ({ post, index }: Props) => {
  const boardId = useSelector((state: RootState) => state.boardPicker.boardId);
  const chanApi = useSelector((state: RootState) => state.chanAPI);
  const { width, height } = Dimensions.get('window');
  const image = imageUtils.calculateAspectRatio(post.w, post.h, width, height);
  const galleryPos: number = useSelector(
    (state: RootState) => state.thread.galleryPos
  );

  if (index === galleryPos) {
    console.log('lol');
    return (
      <FastImage
        style={{ width: width, height: image.height }}
        source={{ uri: chanApi.genImageURI(boardId, post.tim, post.ext) }}
      />
    );
  } else {
    return (
      <FastImage
        style={{ width: width, height: image.height }}
        source={{ uri: chanApi.genThumbnailUri(boardId, post.tim) }}
      />
    );
  }
};
