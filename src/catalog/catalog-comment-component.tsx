import React from 'react';
import { StyleSheet, Text } from 'react-native';

import commentParser from 'src/comment/comment-parser';

interface Props {
  comment: string;
}
export const CatalogCommentComponent = ({ comment }: Props) => {
  // Remove extra whitespace so we can show more of the comment
  const trimmedComment = comment.replace(/(<br>){2,}/g, '<br>');

  const nodes = commentParser(trimmedComment)
    .spoilers()
    .quoteLinks()
    .deadLinks()
    .quotes()
    .getNodes();

  return (
    <Text style={styles.comment} selectable={true}>
      {nodes}
    </Text>
  );
};

const styles = StyleSheet.create({
  comment: {
    textAlign: 'center'
  }
});
