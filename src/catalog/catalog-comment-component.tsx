import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { HTMLComponent } from 'src/shared/html/html-component';

type Props = { comment: string };
export const CatalogCommentComponent = (props: Props) => {
  // Remove unnecessary whitespace
  const comment = props.comment.replace('<br><br>', '<br>');

  return (
    <Text selectable={true} style={styles.comment}>
      <HTMLComponent html={comment} />
    </Text>
  );
};

const styles = StyleSheet.create({
  comment: {
    textAlign: 'center'
  }
});
