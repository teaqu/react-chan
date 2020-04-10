import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';
import imageUtils from 'src/shared/utils/image-utils';

import postActions from './post-actions';

type Props = { postIndex: number };
export const PostImageComponent = (props: Props) => {
  const dispatch = useDispatch();
  const boardId = useSelector((state: RootState) => state.boardPicker.boardId);
  const post = useSelector(
    (state: RootState) => state.posts.posts[props.postIndex]
  );
  const imageURI = useSelector((state: RootState) => state.chanAPI.image);
  const [imageLoading, setImageLoading] = useState(0);
  const thumbnailURI = useSelector(
    (state: RootState) => state.chanAPI.thumbnail
  );

  const [width, setWidth] = useState(0);
  const onLayout = (event: any) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const image = imageUtils.calculateAspectRatioFit(
    post.w,
    post.h,
    width,
    post.h
  );

  return (
    <TouchableWithoutFeedback
      style={styles.imageContainer}
      onPress={() => {
        dispatch(postActions.toggleImage(post.tim));
      }}
      onLayout={onLayout}
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
        resizeMode={'stretch'}
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
