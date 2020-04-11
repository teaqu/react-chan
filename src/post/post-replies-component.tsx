import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';

import postActions from './post-actions';
import { PostComponent } from './post-component';

interface Props {
  postIndex: number;
}
export const PostRepliesComponent = React.memo(({ postIndex }: Props) => {
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.posts.posts[postIndex]);

  const showReply = (replyIndex: number) => {
    dispatch(postActions.toggleReply(postIndex, replyIndex));
  };

  return (
    (typeof post.reply_links === 'object' && post.reply_links.length > 0 && (
      <>
        <View style={styles.replies}>
          {post.reply_links.map(reply => (
            <Text
              key={'reply-link-' + reply.no}
              style={[
                post.reply_links_showing.includes(reply.index) &&
                  styles.inlined,
                styles.reply
              ]}
              onPress={() => showReply(reply.index)}
            >
              >>{reply.no}
            </Text>
          ))}
        </View>
        {post.reply_links_showing.map(reply => (
          <View style={styles.repliesShowing}>
            <PostComponent
              key={'reply-' + reply}
              postIndex={reply}
              isReply={true}
            />
          </View>
        ))}
      </>
    )) ||
    null
  );
});

const styles = StyleSheet.create({
  replies: {
    padding: 3,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#c9cde8',
    borderColor: '#b7c5d9',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  repliesShowing: {
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 3,
    marginTop: -5,
    paddingBottom: 0,
    backgroundColor: '#c9cde8',
    borderColor: '#b7c5d9',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  reply: {
    color: '#34345c',
    fontSize: 13
  },
  inlined: {
    opacity: 0.5
  }
});
