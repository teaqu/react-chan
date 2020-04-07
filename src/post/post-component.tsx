import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler';
import { AllHtmlEntities } from 'html-entities';
import FastImage from 'react-native-fast-image';

import { RootState } from 'src/shared/root-reducer';
import imageUtils from 'src/shared/utils/image-utils';

import { Post } from './post';

type Props = { post: Post };
export const PostComponent = React.memo((props: Props) => {
  const { post } = props;

  const thumbnailURI = useSelector(
    (state: RootState) => state.chanAPI.thumbnail
  );
  const imageURI = useSelector((state: RootState) => state.chanAPI.image);
  const boardId = useSelector((state: RootState) => state.boardPicker.boardId);
  const screen = useSelector((state: RootState) => state.screen);

  const [showImageInfo, setShowImageInfo] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageLoading, setImageLoading] = useState(0);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const image = imageUtils.calculateAspectRatioFit(
    post.w,
    post.h,
    Math.min(screen.width - 22, post.w),
    1000
  );
  const thumbnail = imageUtils.calculateAspectRatioFit(
    post.tn_w,
    post.tn_h,
    80,
    200
  );

  const entities = new AllHtmlEntities();
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
        {post.tim && showImage && (
          <TouchableWithoutFeedback
            onPress={() => {
              setShowImage(false);
            }}
          >
            {imageLoading < 100 && (
              // Show the thumbnail while image is loading
              <View style={{ width: image.width }}>
                <View style={[styles.loading, { width: `${imageLoading}%` }]} />
                <Image
                  source={{
                    uri: thumbnailURI
                      .replace('%BOARDID%', boardId)
                      .replace('%TIM%', post.tim.toString())
                  }}
                  style={{ height: image.height, width: image.width }}
                  resizeMode="contain"
                />
              </View>
            )}
            <FastImage
              onProgress={event => {
                const loaded = event.nativeEvent.loaded;
                const total = event.nativeEvent.total;
                setImageLoading((loaded / total) * 100);
              }}
              source={{
                uri:
                  imageURI
                    .replace('%BOARDID%', boardId)
                    .replace('%TIM%', post.tim.toString()) + post.ext
              }}
              style={[
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  height: imageLoading < 100 ? 0 : image.height,
                  width: image.width
                }
              ]}
              resizeMode={'contain'}
            />
          </TouchableWithoutFeedback>
        )}
        <View style={styles.post_flex}>
          {post.tim && !showImage && (
            <TouchableOpacity
              onLongPress={() => {
                setShowImageInfo(!showImageInfo);
              }}
              onPress={() => {
                setShowImage(true);
              }}
            >
              <View
                style={[
                  styles.thumbnail_container,
                  { height: thumbnail.height }
                ]}
              >
                {!thumbnailLoaded && (
                  <ActivityIndicator style={styles.thumbnail_indicator} />
                )}
                <FastImage
                  onLoadEnd={() => {
                    setThumbnailLoaded(true);
                  }}
                  source={{
                    uri: thumbnailURI
                      .replace('%BOARDID%', boardId)
                      .replace('%TIM%', post.tim.toString())
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
              <Text style={styles.imageInfo}>
                {imageUtils.bytesToSize(post.fsize)}
              </Text>
              {showImageInfo && (
                <Text style={styles.imageInfo}>
                  {post.w}x{post.h}
                </Text>
              )}
            </TouchableOpacity>
          )}
          <View style={styles.comment_container}>
            {post.tim && showImageInfo && (
              <Text style={styles.filename}>
                {post.filename}
                {post.ext}
              </Text>
            )}
            {post.sub && (
              <Text selectable={true} style={styles.sub}>
                {entities.decode(post.sub)}
              </Text>
            )}
            {post.com && (
              <View style={styles.comment_container}>
                <HTML html={post.com} />
              </View>
            )}
          </View>
        </View>
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
    backgroundColor: '#d6daf0'
  },
  post_flex: {
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
    fontSize: 12,
    marginTop: 2
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
  thumbnail: {},
  thumbnail_indicator: {},
  thumbnail_container: {
    backgroundColor: '#c9cde8',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  comment_container: {
    flex: 1
  },
  imageInfo: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    width: 80
  },
  filename: {
    fontSize: 12,
    color: '#555'
  },
  sub: {
    fontWeight: 'bold',
    color: '#0f0c5d'
  },
  loading: {
    marginBottom: -4,
    zIndex: 1,
    height: 2,
    backgroundColor: 'red'
  }
});
