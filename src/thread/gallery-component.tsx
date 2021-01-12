import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import PageList from 'react-native-page-list';

import { RootState } from 'src/shared/root-reducer';
import { GalleryImageComponent } from 'src/thread/gallery-image-component';
import * as actions from 'src/thread/thread-actions';

/**
 * Render a thread
 */
export const GalleryComponent = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.thread.posts);

  const gallery = Object.values(posts).filter(p => p.tim);

  return (
    <PageList
      data={gallery}
      renderItem={({ item, index }) => (
        <GalleryImageComponent post={item} index={index} />
      )}
      initialNumToRender={1}
      onPageSelected={(index: number) => {
        dispatch(actions.setGalleryPos(index));
      }}
    />
  );
};
