import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';
import imageUtils from 'src/shared/utils/image-utils';

import { Post } from './post';
import postActions from './post-actions';

type Props = { post: Post };
export const PostImageComponent = (props: Props) => {
  const dispatch = useDispatch();
  const boardId = useSelector((state: RootState) => state.boardPicker.boardId);
  const post = props.post;
  const screen = useSelector((state: RootState) => state.screen);
  const imageURI = useSelector((state: RootState) => state.chanAPI.image);
  const [imageLoading, setImageLoading] = useState(0);
  const thumbnailURI = useSelector(
    (state: RootState) => state.chanAPI.thumbnail
  );
  const image = imageUtils.calculateAspectRatioFit(
    post.w,
    post.h,
    Math.min(screen.width - 22, post.w),
    post.h
  );

  return (
    <TouchableWithoutFeedback
      style={styles.imageContainer}
      onPress={() => {
        dispatch(postActions.toggleImage(post.tim));
      }}
    >
      {imageLoading < 100 && (
        // Show the thumbnail while image is loading
        <View style={{ width: image.width }}>
          <View style={[styles.loading, { width: `${imageLoading}%` }]} />
          <FastImage
            source={{
              uri: thumbnailURI
                .replace('[board]', boardId)
                .replace('[tim]', post.tim.toString())
            }}
            style={{ height: image.height, width: image.width }}
          />
        </View>
      )}
      <FastImage
        onProgress={event => {
          const loaded = event.nativeEvent.loaded;
          const total = event.nativeEvent.total;
          setImageLoading((loaded / total) * 100);
        }}
        onLoadEnd={() => {
          setImageLoading(100);
        }}
        source={{
          uri:
            imageURI
              .replace('[board]', boardId)
              .replace('[tim]', post.tim.toString()) + post.ext
        }}
        style={
          // eslint-disable-next-line react-native/no-inline-styles
          {
            height: imageLoading < 100 ? 0 : image.height,
            width: image.width
          }
        }
        resizeMode={'contain'}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  loading: {
    zIndex: 1,
    height: 2,
    backgroundColor: 'red',
    marginBottom: -2
  },
  imageContainer: {
    marginTop: 4
  }
});
