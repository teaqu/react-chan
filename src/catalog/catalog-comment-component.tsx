import React from 'react';
import HTML from 'react-native-render-html';
import { StyleSheet } from 'react-native';

import renderers from 'src/comment/renderers';
import tagStyles from 'src/comment/tag-styles';

type Props = { comment: string };
export const CatalogCommentComponent = (props: Props) => {
  // Remove unnecessary whitespace
  const comment = props.comment.replace('<br><br>', '<br>');

  return (
    <HTML
      html={`<p>${comment}</p>`}
      renderers={renderers()}
      textSelectable={true}
      tagsStyles={{
        p: {
          textAlign: 'center'
        },
        ...tagStyles
      }}
      containerStyle={styles.com_container}
    />
  );
};

const styles = StyleSheet.create({
  com_container: {}
});
