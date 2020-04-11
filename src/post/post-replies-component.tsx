import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';

import postActions from './post-actions';
import { PostComponent } from './post-component';

interface Props {
  postNo: number;
}
export const PostRepliesComponent = React.memo(({ postNo }: Props) => {
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.posts.posts[postNo]);

  const showReply = (replyNo: number) => {
    dispatch(postActions.toggleReply(postNo, replyNo));
  };

  return (
    (post.reply_links.length > 0 && (
      <>
        <View style={styles.replies}>
          {post.reply_links.map((replyNo, index) => (
            <Text
              key={'reply-link-' + post.no + '-' + index}
              style={[
                post.reply_links_showing.includes(replyNo) && styles.inlined,
                styles.reply
              ]}
              onPress={() => showReply(replyNo)}
            >
              >>{replyNo}
            </Text>
          ))}
        </View>
        <View style={styles.repliesShowing}>
          {post.reply_links_showing.map((replyNo, index) => (
            <PostComponent
              key={'reply-' + post.no + '-' + index}
              postNo={replyNo}
              isReply={true}
            />
          ))}
        </View>
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
