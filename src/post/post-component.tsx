import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AllHtmlEntities } from 'html-entities';
import { useSelector } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';

import { PostCommentComponent } from './post-comment-component';
import { PostHeaderComponent } from './post-header-component';
import { PostImageComponent } from './post-image-component';
import { PostThumbnailComponent } from './post-thumbnail-component';
import { PostRepliesComponent } from './post-replies-component';

type Props = { postIndex: number; isReply: boolean };
export const PostComponent = React.memo((props: Props) => {
  const post = useSelector(
    (state: RootState) => state.posts.posts[props.postIndex]
  );
  const entities = new AllHtmlEntities();
  const op = post.replies !== undefined;
  if (post.hidden && !props.isReply) {
    return <></>;
  }
  return (
    <View
      style={[
        styles.postContainer,
        op && styles.opContainer,
        props.isReply && styles.postReply
      ]}
    >
      <PostHeaderComponent postIndex={props.postIndex} />
      <View style={[styles.post]}>
        {post.tim && post.show_image && (
          <PostImageComponent postIndex={props.postIndex} />
        )}
        <View style={styles.postFlex}>
          {post.tim && !post.show_image && (
            <PostThumbnailComponent postIndex={props.postIndex} />
          )}
          <View style={styles.commentContainer}>
            {post.tim && post.show_image_info && (
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
      <PostRepliesComponent postIndex={props.postIndex} />
    </View>
  );
});

const styles = StyleSheet.create({
  postReply: {
    paddingRight: 0,
    paddingLeft: 0,
    width: '100%'
  },
  postContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  post: {
    borderColor: '#b7c5d9',
    borderWidth: 1,
    padding: 5,
    paddingTop: 1,
    backgroundColor: '#d6daf0'
  },
  postFlex: {
    flexDirection: 'row',
    flex: 1
  },
  opContainer: {
    paddingLeft: 0,
    paddingRight: 0
  },
  filename: {
    fontSize: 12,
    color: '#555'
  },
  sub: {
    fontWeight: 'bold',
    color: '#0f0c5d'
  },
  commentContainer: {
    flex: 1
  }
});
