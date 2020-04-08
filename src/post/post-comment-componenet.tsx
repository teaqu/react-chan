import React from 'react';
import HTML from 'react-native-render-html';
import { StyleSheet } from 'react-native';

import renderers from 'src/comment/renderers';
import tagStyles from 'src/comment/tag-styles';

type Props = { comment: string };
export const PostCommentComponent = (props: Props) => {
  return (
    <HTML
      html={props.comment}
      renderers={renderers()}
      textSelectable={true}
      tagsStyles={tagStyles}
      containerStyle={styles.com_container}
    />
  );
};

const styles = StyleSheet.create({
  com_container: {}
});
