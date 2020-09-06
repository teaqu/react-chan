import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';

import postActions from './post-actions';
import { PostComponent } from './post-component';
import { findReplyInStateTree } from './post-state';

interface Props {
  postNo: number;
  postStateKey: string;
}
export const PostRepliesComponent = React.memo(
  ({ postNo, postStateKey }: Props) => {
    const dispatch = useDispatch();
    const post = useSelector((state: RootState) => state.posts.posts[postNo]);
    const postState = useSelector(
      (state: RootState) => state.posts.postStates[postStateKey]
    );
    const toggleReply = (replyNo: number) => {
      dispatch(postActions.toggleReply(postStateKey, replyNo));
    };
    if (!post.reply_links) {
      return null;
    }
    return (
      <View style={styles.replies}>
        {post.reply_links.map((replyNo, replyLinkIndex) => (
          <Text
            key={`reply-link-${replyNo}-${replyLinkIndex}`}
            style={[
              findReplyInStateTree(postStateKey, replyNo).length > 0 &&
                styles.replyShowing,
              postState.reply_links_showing.includes(replyNo) && styles.inline,
              styles.reply
            ]}
            onPress={() => toggleReply(replyNo)}
          >
            &gt;&gt;{replyNo}
          </Text>
        ))}
        <View style={styles.repliesShowing}>
          {postState.reply_links_showing.map((replyNo) => (
            <PostComponent
              key={postStateKey + '-' + replyNo}
              postStateKey={postStateKey + '-' + replyNo}
              postNo={replyNo}
            />
          ))}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  replies: {
    padding: 3,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#c9cde8',
    borderColor: '#b7c5d9',
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  repliesShowing: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: -3
  },
  reply: {
    color: '#34345c',
    fontSize: 13,
    marginRight: 5
  },
  replyShowing: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted'
  },
  inline: {
    opacity: 0.2
  }
});
