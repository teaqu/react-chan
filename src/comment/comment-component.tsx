import React, { ReactNode } from 'react';
import HTML, {
  HtmlAttributesDictionary,
  RendererDictionary,
  PassProps,
  NonRegisteredStylesProp
} from 'react-native-render-html';
import { StyleSheet } from 'react-native';

import { SpoilerComponent } from './spoiler-component';

type Props = { comment: string };
export const CommentComponent = (props: Props) => {
  const renderers = (): RendererDictionary => {
    return {
      s: {
        renderer: (
          htmlAttribs: HtmlAttributesDictionary,
          children: ReactNode,
          convertedCSSStyles: NonRegisteredStylesProp<any>,
          passProps: PassProps
        ) => <SpoilerComponent children={children} key={passProps.key} />,
        wrapper: 'View'
      }
    };
  };

  return (
    <HTML
      html={'<p>' + props.comment + '</p>'}
      renderers={renderers()}
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
