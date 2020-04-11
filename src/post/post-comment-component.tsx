import React from 'react';
import { SelectableText } from '@astrocoders/react-native-selectable-text';

import { CommentComponent } from 'src/comment/comment-component';

interface Props {
  comment: string;
}
export const PostCommentComponent = React.memo((props: Props) => {
  return (
    <SelectableText
      menuItems={['quote']}
      value={<CommentComponent html={props.comment} />}
    />
  );
});
