import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { Post } from './post';
import postActions from './post-actions';

type Props = { post: Post };
export const PostRepliesComponent = (props: Props) => {
  const post = props.post;

  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof post.post_replies === 'undefined') {
      dispatch(postActions.calcReplies(post.index));
    }
  });

  return (
    (typeof post.post_replies === 'object' && post.post_replies.length > 0 && (
      <View style={styles.replies}>
        {post.post_replies.map(reply => (
          <Text style={styles.reply}>>>{reply} </Text>
        ))}
      </View>
    )) ||
    null
  );
};

const styles = StyleSheet.create({
  replies: {
    padding: 5,
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
  reply: {
    color: '#34345c',
    fontSize: 13
  }
});
