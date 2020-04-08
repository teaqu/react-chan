import React, { useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { RootState } from 'src/shared/root-reducer';
import imageUtils from 'src/shared/utils/image-utils';

import { Post } from './post';
import postActions from './post-actions';

type Props = { post: Post };
export const PostThumbnailComponent = (props: Props) => {
  const dispatch = useDispatch();
  const post = props.post;
  const boardId = useSelector((state: RootState) => state.boardPicker.boardId);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
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
          // eslint-disable-next-line react-native/no-inline-styles
          {
            height: thumbnail.height,
            backgroundColor: thumbnailLoaded ? 'rgba(0,0,0,0)' : '#c9cde8'
          }
        ]}
      >
        {!thumbnailLoaded && (
          <ActivityIndicator style={styles.thumbnailIndicator} />
        )}
        <FastImage
          onLoadEnd={() => {
            setThumbnailLoaded(true);
          }}
          source={{
            uri: thumbnailURI
              .replace('[board]', boardId)
              .replace('[tim]', post.tim.toString())
          }}
          style={[
            styles.thumbnail,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              height: thumbnailLoaded ? thumbnail.height : 0,
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
};

const styles = StyleSheet.create({
  thumbnail: {},
  thumbnailIndicator: {},
  thumbnailContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  imageInfo: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center'
  },
  touchable: {
    marginRight: 5,
    minWidth: 40
  }
});
