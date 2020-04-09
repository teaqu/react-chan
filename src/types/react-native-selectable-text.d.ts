declare module '@astrocoders/react-native-selectable-text' {
  import { Component, ReactNode, ReactNodeArray } from 'react';
  import { TextProps } from 'react-native';

  interface ContainerProps<P = {}> extends TextProps {
    menuItems: string[];
    value: string | Element;
  }

  export class SelectableText<P> extends Component<ContainerProps<P>> {}
}
