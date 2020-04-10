import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { RootState } from 'src/shared/root-reducer';
import imageUtils from 'src/shared/utils/image-utils';

import postActions from './post-actions';

type Props = { postIndex: number };
export const PostThumbnailComponent = React.memo((props: Props) => {
  const dispatch = useDispatch();
  const post = useSelector(
    (state: RootState) => state.posts.posts[props.postIndex]
  );
  const boardId = useSelector((state: RootState) => state.boardPicker.boardId);
  const thumbnailURI = useSelector(
    (state: RootState) => state.chanAPI.thumbnail
  );
  const thumbnail = imageUtils.calculateAspectRatioFit(
    post.tn_w,
    post.tn_h,
    80,
    post.tn_h
  );

  return (
    <TouchableOpacity
      style={[styles.touchable, { width: thumbnail.width }]}
      onLongPress={() => {
        dispatch(postActions.toggleImageInfo(post.tim));
      }}
      onPress={() => {
        dispatch(postActions.toggleImage(post.tim));
      }}
    >
      <View
        style={[
          styles.thumbnailContainer,
          {
            height: thumbnail.height
          }
        ]}
      >
        <FastImage
          source={{
            uri: thumbnailURI
              .replace('[board]', boardId)
              .replace('[tim]', post.tim.toString())
          }}
          style={[
            styles.thumbnail,
            {
              height: thumbnail.height,
              width: thumbnail.width
            }
          ]}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.imageInfo}>{imageUtils.bytesToSize(post.fsize)}</Text>
      {post.show_image_info && (
        <Text style={styles.imageInfo}>
          {post.w}x{post.h}
        </Text>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  thumbnail: {},
  thumbnailIndicator: {},
  thumbnailContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 4
  },
  imageInfo: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: -2
  },
  touchable: {
    marginRight: 5,
    minWidth: 40
  }
});
