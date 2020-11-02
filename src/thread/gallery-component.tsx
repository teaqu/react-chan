import React from 'react';
import { useSelector } from 'react-redux';
import GallerySwiper from 'react-native-gallery-swiper';

import { RootState } from 'src/shared/root-reducer';
import { GalleryImageComponent } from 'src/thread/gallery-image-component';

/**
 * Render a thread
 */
export const GalleryComponent = () => {
  const chanApi = useSelector((state: RootState) => state.chanAPI);
  const boardId = useSelector((state: RootState) => state.catalog.boardId);
  const posts = useSelector((state: RootState) => state.thread.posts);

  const gallery = Object.values(posts)
    .filter(p => p.tim)
    .map(p => ({
      uri: chanApi.genImageURI(boardId, p.tim, p.ext),
      dimensions: { width: p.w, height: p.h }
    }));

  return (
    <GallerySwiper
      images={gallery}
      imageComponent={GalleryImageComponent}
      // Version *1.15.0 update
      // onEndReached={() => {
      //     // add more images when scroll reaches end
      // }}
    />
  );
};
