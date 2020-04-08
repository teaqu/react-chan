import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import { PostCommentComponent } from './post-comment-componenet';

type Props = { post: Post };
export const PostComponent = React.memo((props: Props) => {
  const { post } = props;

  const thumbnailURI = useSelector(
    (state: RootState) => state.chanAPI.thumbnail
  );
  const imageURI = useSelector((state: RootState) => state.chanAPI.image);
  const flagURI = useSelector((state: RootState) => state.chanAPI.flag);
  const trollFlagURI = useSelector(
    (state: RootState) => state.chanAPI.trollFlag
  );
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
    post.h
  );
  const thumbnail = imageUtils.calculateAspectRatioFit(
    post.tn_w,
    post.tn_h,
    80,
    post.tn_h
  );
  const entities = new AllHtmlEntities();
  const op = post.replies !== undefined;
  return (
    <View style={[styles.post_container, op && styles.op_container]}>
      <View style={[styles.post_header, op && styles.op_header]}>
        <View style={styles.header_flex}>
          <Text style={styles.name}>{post.name}</Text>
          {post.trip && <Text>!{post.trip}</Text>}
          {post.since4pass && (
            <Image
              source={{
                uri: 'https://s.4cdn.org/image/minileaf.gif'
              }}
              style={styles.capcode}
            />
          )}
          <Text style={styles.date_no}>
            {post.now} No.{post.no}
          </Text>
        </View>
        <View style={styles.header_flex}>
          {post.country && (
            <Image
              source={{
                uri: flagURI.replace('[country]', post.country.toLowerCase())
              }}
              style={styles.flag}
            />
          )}
          {post.troll_country && (
            <Image
              source={{
                uri: trollFlagURI.replace(
                  '[country]',
                  post.troll_country.toLowerCase()
                )
              }}
              style={styles.flag}
            />
          )}
          {post.country_name && <Text>{post.country_name}</Text>}
          {post.id && (
            <Text
              style={[
                styles.id,
                {
                  backgroundColor: `rgb(
                    ${post.id.charCodeAt(0) + post.id.charCodeAt(1)},
                    ${post.id.charCodeAt(2) + post.id.charCodeAt(3)},
                    ${post.id.charCodeAt(4) + post.id.charCodeAt(5)}
                  )`
                }
              ]}
            >
              ID: {post.id}
            </Text>
          )}
        </View>
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
                      .replace('[board]', boardId)
                      .replace('[tim]', post.tim.toString())
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
                    .replace('[board]', boardId)
                    .replace('[tim]', post.tim.toString()) + post.ext
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
            {post.com && <PostCommentComponent comment={post.com} />}
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
    padding: 5,
    backgroundColor: '#c9cde8'
  },
  header_flex: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
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
  thumbnail: {},
  thumbnail_indicator: {},
  thumbnail_container: {
    backgroundColor: '#c9cde8',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  flag: {
    height: 11,
    width: 16,
    marginRight: 5
  },
  id: {
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 10,
    marginLeft: 'auto',
    borderRadius: 2
  },
  capcode: {
    height: 14,
    width: 14,
    marginLeft: 2
  },
  comment_container: {
    flex: 1
  }
});
