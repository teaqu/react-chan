import React, { ReactNode } from 'react';
import HTML, {
  HtmlAttributesDictionary,
  RendererDictionary,
  PassProps,
  NonRegisteredStylesProp
} from 'react-native-render-html';
import { StyleSheet } from 'react-native';

import { SpoilerComponent } from '../comment/spoiler-component';

type Props = { comment: string };
export const CatalogCommentComponent = (props: Props) => {
  const renderers = (): RendererDictionary => {
    return {
      s: {
        renderer: (
          htmlAttribs: HtmlAttributesDictionary,
          children: ReactNode,
          convertedCSSStyles: NonRegisteredStylesProp<any>,
          passProps: PassProps
        ) => <SpoilerComponent children={children} key={passProps.key} />,
        wrapper: 'Text'
      }
    };
  };

  // Remove unnecessary whitespace
  const comment = props.comment.replace('<br><br>', '<br>');

  return (
    <HTML
      html={'<p>' + comment + '</p>'}
      renderers={renderers()}
      textSelectable={true}
      tagsStyles={{
        p: {
          textAlign: 'center'
        },
        s: {
          textDecorationLine: 'none',
          backgroundColor: 'black'
        }
      }}
      containerStyle={styles.com_container}
    />
  );
};

const styles = StyleSheet.create({
  com_container: {
    maxHeight: 100,
    overflow: 'hidden'
  }
});
