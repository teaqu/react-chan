import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { CommentComponent } from 'src/comment/comment-component';

interface Props {
  comment: string;
}
export const CatalogCommentComponent = ({ comment }: Props) => {
  // Remove whitespace as we want to show as much of the comment as possible
  const trimmedComment = comment.replace('<br><br>', '<br>');
  return (
    <Text selectable={true} style={styles.comment}>
      <CommentComponent html={trimmedComment} />
    </Text>
  );
};

const styles = StyleSheet.create({
  comment: {
    textAlign: 'center'
  }
});
