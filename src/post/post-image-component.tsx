import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';
import imageUtils from 'src/shared/utils/image-utils';

import postActions from './post-actions';

interface Props {
  postNo: number;
  postStateKey: string;
}
export const PostImageComponent = ({ postNo, postStateKey }: Props) => {
  const dispatch = useDispatch();
  const boardId = useSelector((state: RootState) => state.boardPicker.boardId);
  const post = useSelector((state: RootState) => state.posts.posts[postNo]);
  const [imageLoading, setImageLoading] = useState(0);
  const chanApi = useSelector((state: RootState) => state.chanAPI);
  const [width, setWidth] = useState(0);
  const onLayout = (event: any) => {
    setWidth(event.nativeEvent.layout.width);
  };
  const image = imageUtils.calculateAspectRatio(post.w, post.h, width);
  return (
    <TouchableWithoutFeedback
      style={styles.imageContainer}
      onPress={() => {
        dispatch(postActions.toggleImage(postStateKey));
      }}
      onLayout={onLayout}
    >
      {imageLoading < 100 && (
        // Show the thumbnail while image is loading
        <View style={{ width: image.width }}>
          <View style={[styles.loading, { width: `${imageLoading}%` }]} />
          <FastImage
            source={{
              uri: chanApi.genThumbnailUri(boardId, post.tim)
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
          uri: chanApi.genImageURI(boardId, post.tim, post.ext)
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
