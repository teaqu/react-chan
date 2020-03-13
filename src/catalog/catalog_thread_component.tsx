import React, { Component, ReactNode } from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';
import HTML, { 
  HtmlAttributesDictionary, 
  RendererDictionary, 
  PassProps, 
  NonRegisteredStylesProp 
} from 'react-native-render-html'; 
import { Thread } from 'src/thread/thread';

type State = {
  spoilers: {
    [key: string]: boolean;
  };
  thread: Thread;
}

type Props = {
    thread: Thread;
}

/**
 * Rendering a thread in the catalog
 */
export class CatalogThreadComponent extends Component<Props> {

  state: State;

   constructor(props: Props) {
    super(props);

    this.state = {
      spoilers: {},
      thread: props.thread,
    };

  }

  render(): ReactNode {
    const thread = this.state.thread;
    return (
      <View style={styles.thread}>
          <Image 
            source={{uri: 'https://i.4cdn.org/a/' + thread.tim + 's.jpg'}}
            style={{width: '100%', height: 100}} 
          /> 
          <Text style={styles.stats}>
            {thread.replies} / {thread.images} / {thread.page}
          </Text>
          {thread.sub && <Text style={styles.sub}>{thread.sub}</Text>}
          {thread.com && 
            <HTML html={thread.com}
                  renderers = {this.renderers(thread)}
            />
          }
          
      </View>
    );
  }

  /**
   * Custom html renderers for our thread
   * Allows us to style spilers etc
   * 
   * @param thread 
   */
  private renderers(thread: Thread): RendererDictionary {
    return {
      's': {
        renderer: (
          htmlAttribs: HtmlAttributesDictionary, 
          children: ReactNode,
          convertedCSSStyles: NonRegisteredStylesProp<any>,
          passProps: PassProps
        ) => this.renderSTag(children, thread, passProps),
        wrapper: 'View'
      }
  }}

  /**
   * Render a spoiler
   * 
   * @param children the spoilers children nodes
   * @param thread 
   * @param passProps allows us to extract a key via nodeIndex so we know which
   *                  spoiler has been pressed;
   */
  private renderSTag(
    children: ReactNode, 
    thread: Thread, 
    passProps: PassProps
  ) {

    // Get key for this spoiler so we can track it's status
    let key = passProps.nodeIndex;
    let spoilers = this.state.spoilers;

    // Add to list of spoilers if this is the first render
    if (typeof spoilers[key] == "undefined") {
      spoilers[key] = false; // false == Don't show spoiler
    }

    let html: ReactNode = 
        <Text key={thread.no}
          style={ ! spoilers[key] && {backgroundColor: 'black'}}
          onPress = {() => this.onSpoilerPress(key)}
        >
          {children}
        </Text>
    
    return html;
  }

  /**
   * @param key to identify pressed spoiler
   */
  private onSpoilerPress(key: number) {

    // Change spoiler status
    this.state.spoilers[key] = ! this.state.spoilers[key];

    // Force html to rerender by adding span
    this.state.thread.com = this.state.thread.com + '<span></span>';
    this.setState({
      spoilers: this.state.spoilers,
    });
  }

}

const styles = StyleSheet.create({
  thread: {
    margin: 2,
    padding: 2,
    flex: 1,
    flexDirection: 'column'
  },
  s: {
    backgroundColor: 'black',
    color: 'red'
  },
  sub: {
    fontWeight: 'bold',
    color: '#0f0c5d'
  },
  stats: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});