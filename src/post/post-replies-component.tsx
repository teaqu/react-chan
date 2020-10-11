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
    // Show/hide a reply on pressing a reply link
    const toggleReply = (replyNo: number) => {
      dispatch(postActions.toggleReply(postStateKey, replyNo));
      dispatch(postActions.clearRedBorder(postStateKey));
    };
    if (!post.reply_links) {
      return null;
    }
    return (
      <View style={styles.replies}>
        <Text style={styles.replyText}>
          {post.reply_links.map((replyNo, replyLinkIndex) => (
            <Text key={`reply-link-${replyNo}-${replyLinkIndex}`}>
              <Text
                style={[
                  findReplyInStateTree(postStateKey, replyNo).length > 0 &&
                    styles.replyShowing,
                  (postState.reply_links_showing.includes(replyNo) &&
                    styles.inline) ||
                    styles.notInline
                ]}
                onPress={() => toggleReply(replyNo)}
              >
                &gt;&gt;{replyNo}
              </Text>{' '}
            </Text>
          ))}
        </Text>
        <View style={styles.repliesShowing}>
          {postState.reply_links_showing.map(replyNo => (
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
    backgroundColor: '#c9cde8',
    borderColor: '#b7c5d9',
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  repliesShowing: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 3,
    paddingRight: 3,
    marginBottom: -2
  },
  replyShowing: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted'
  },
  inline: {
    color: '#8587a6'
  },
  notInline: {
    color: '#34345c'
  },
  replyText: {
    fontSize: 13,
    padding: 3
  }
});
