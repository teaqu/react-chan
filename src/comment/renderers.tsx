import React from 'react';
import {
  RendererDictionary,
  HtmlAttributesDictionary,
  NonRegisteredStylesProp,
  PassProps
} from 'react-native-render-html';
import { ReactNode } from 'react';

import { SpoilerComponent } from './spoiler-component';

export default function renderers(): RendererDictionary {
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
}
