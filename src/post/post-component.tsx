import React from 'react';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import { View, Image, StyleSheet, Text } from 'react-native';

import { RootState } from 'src/shared/root-reducer';
import imageUtils from 'src/shared/utils/image-utils';

import { Post } from './post';

/**
 * Rendering a thread in the catalog
 */
type Props = { post: Post };
export const PostComponent = React.memo((props: Props) => {
  const { post } = props;

  const thumbnailURI = useSelector(
    (state: RootState) => state.chanAPI.thumbnail
  );
  const boardId = useSelector((state: RootState) => state.boardPicker.boardId);

  const tnDimensions = imageUtils.calculateAspectRatioFit(
    post.tn_w,
    post.tn_h,
    100,
    200
  );
  const op = post.replies !== undefined;
  return (
    <View style={[styles.post_container, op && styles.op_container]}>
      <View style={[styles.post_header, op && styles.op_header]}>
        <Text style={styles.name}>{post.name}</Text>
        <Text style={styles.date_no}>
          {post.now} No.{post.no}
        </Text>
      </View>
      <View style={[styles.post, op && styles.op_post]}>
        {post.tim && (
          <View>
            <Image
              source={{
                uri: thumbnailURI
                  .replace('%BOARDID%', boardId)
                  .replace('%TIM%', post.tim.toString())
              }}
              style={[
                styles.thumbnail,
                { height: tnDimensions.height, width: tnDimensions.width }
              ]}
              resizeMode="stretch"
            />
            <Text style={styles.imageInfo}>
              {post.filename}
              {post.ext}
            </Text>
            <Text style={styles.imageInfo}>
              ({imageUtils.bytesToSize(post.fsize)}, {post.w}x{post.h})
            </Text>
          </View>
        )}
        {post.com && (
          <View style={styles.comment_container}>
            <HTML html={post.com || '<span></span>'} />
          </View>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  post_container: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  post: {
    borderColor: '#b7c5d9',
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#d6daf0',
    flexDirection: 'row',
    flex: 1
  },
  post_header: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#c9cde8'
  },
  name: {
    color: '#117743',
    fontWeight: '700'
  },
  date_no: {
    marginLeft: 'auto',
    fontSize: 12
  },
  op_container: {
    paddingLeft: 0,
    paddingRight: 0
  },
  op_post: {
    borderWidth: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  op_header: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  thumbnail: {
    marginRight: 10
  },
  comment_container: {
    flex: 1
  },
  imageInfo: {
    width: 100,
    textAlign: 'center',
    fontSize: 12,
    color: '#555'
  }
});
