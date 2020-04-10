import React from 'react';
import { SelectableText } from '@astrocoders/react-native-selectable-text';

import { HTMLComponent } from 'src/shared/html/html-component';

type Props = { comment: string };
export const PostCommentComponent = React.memo((props: Props) => {
  return (
    <SelectableText
      menuItems={['quote']}
      value={<HTMLComponent html={props.comment} />}
    />
  );
});
