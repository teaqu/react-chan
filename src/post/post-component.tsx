import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AllHtmlEntities } from 'html-entities';

import { Post } from './post';
import { PostCommentComponent } from './post-comment-component';
import { PostHeaderComponent } from './post-header-component';
import { PostImageComponent } from './post-image-component';
import { PostThumbnailComponent } from './post-thumbnail-component';

type Props = { post: Post };
export const PostComponent = React.memo((props: Props) => {
  const { post } = props;

  const entities = new AllHtmlEntities();
  const op = post.replies !== undefined;
  return (
    <View style={[styles.post_container, op && styles.opContainer]}>
      <PostHeaderComponent post={post} />
      <View style={[styles.post, op && styles.opPost]}>
        {post.tim && post.show_image && <PostImageComponent post={post} />}
        <View style={styles.postFlex}>
          {post.tim && !post.show_image && (
            <PostThumbnailComponent post={post} />
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
  postFlex: {
    flexDirection: 'row',
    flex: 1
  },
  opContainer: {
    paddingLeft: 0,
    paddingRight: 0
  },
  opPost: {
    borderWidth: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
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
