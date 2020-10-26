import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { RootState } from 'src/shared/root-reducer';
import imageUtils from 'src/shared/utils/image-utils';

import postActions from './post-actions';

interface Props {
  postNo: number;
  postStateKey: string;
}

export const PostThumbnailComponent = React.memo(
  ({ postNo, postStateKey }: Props) => {
    const dispatch = useDispatch();
    const post = useSelector((state: RootState) => state.posts.posts[postNo]);
    const postState = useSelector(
      (state: RootState) => state.posts.postStates[postStateKey]
    );
    const boardId = useSelector(
      (state: RootState) => state.boardPicker.boardId
    );
    const chanApi = useSelector((state: RootState) => state.chanAPI);

    // Set image width to <= 80
    const { tn_w, tn_h } = post;
    const thumbnail = imageUtils.calculateAspectRatio(tn_w, tn_h, 80);

    return (
      <TouchableOpacity
        style={[styles.touchable, { width: thumbnail.width }]}
        onLongPress={() => {
          dispatch(postActions.toggleImageInfo(postStateKey));
        }}
        onPress={() => {
          dispatch(postActions.toggleImage(postStateKey));
        }}
      >
        <View style={[styles.thumbnailContainer, { height: thumbnail.height }]}>
          <FastImage
            source={{
              uri: chanApi.genThumbnailUri(boardId, post.tim)
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
        <Text style={styles.imageInfo}>
          {imageUtils.bytesToSize(post.fsize)}
        </Text>
        {postState.show_image_info && (
          <Text style={styles.imageInfo}>
            {post.w}x{post.h}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  thumbnail: {},
  thumbnailIndicator: {},
  thumbnailContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    minWidth: 80
  }
});
