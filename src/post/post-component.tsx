import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AllHtmlEntities } from 'html-entities';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';

import { PostCommentComponent } from './post-comment-component';
import { PostHeaderComponent } from './post-header-component';
import { PostImageComponent } from './post-image-component';
import { PostThumbnailComponent } from './post-thumbnail-component';
import { PostRepliesComponent } from './post-replies-component';
import postActions from './post-actions';

interface Props {
  postNo: number;
  postStateKey?: string;
}
export const PostComponent = React.memo(
  ({ postNo, postStateKey = postNo.toString() }: Props) => {
    const dispatch = useDispatch();
    const postState = useSelector(
      (state: RootState) => state.posts.postStates[postStateKey]
    );
    const post = useSelector((state: RootState) => state.posts.posts[postNo]);
    useEffect(() => {
      // Only show the the red outline for half a second
      if (postState.red_border) {
        setTimeout(() => {
          dispatch(postActions.clearRedBorder(postStateKey));
        }, 500);
      }
    });

    if (postState.hidden) {
      return null;
    }

    const htmlEntities = new AllHtmlEntities(); // For parsing post titles
    const isOp = post.replies !== undefined;
    const isInline = postStateKey.includes('-');
    const hasInline = postState.com_reply_links_showing.length > 0;
    return (
      <View
        style={[
          styles.postContainer,
          isOp && styles.opContainer,
          isInline && styles.inline,
          postState.red_border && styles.redBorder
        ]}
      >
        <PostHeaderComponent postNo={postNo} />
        <View style={[styles.post]}>
          {post.tim && postState.show_image && (
            <PostImageComponent postNo={postNo} postStateKey={postStateKey} />
          )}
          <View style={[styles.postFlex, hasInline && styles.hasInline]}>
            {post.tim && !postState.show_image && (
              <PostThumbnailComponent
                postNo={postNo}
                postStateKey={postStateKey}
              />
            )}
            <View style={styles.commentContainer}>
              {post.tim && postState.show_image_info && (
                <Text style={styles.filename}>
                  {post.filename}
                  {post.ext}
                </Text>
              )}
              {post.sub && (
                <Text selectable={true} style={styles.sub}>
                  {htmlEntities.decode(post.sub)}
                </Text>
              )}
              {post.com && (
                <PostCommentComponent
                  postNo={post.no}
                  postStateKey={postStateKey}
                />
              )}
            </View>
          </View>
        </View>
        {post.reply_links.length > 0 && (
          <PostRepliesComponent postNo={postNo} postStateKey={postStateKey} />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  postContainer: {
    borderColor: '#b7c5d9',
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5
  },
  post: {
    paddingTop: 1,
    backgroundColor: '#d6daf0',
    padding: 5
  },
  postFlex: {
    flex: 1,
    flexDirection: 'row'
  },
  hasInline: {
    flexDirection: 'column'
  },
  inline: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 5,
    width: '100%'
  },
  opContainer: {
    marginLeft: 0,
    marginRight: 0
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
  },
  redBorder: {
    borderColor: 'red',
    borderWidth: 1
  }
});
