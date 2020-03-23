import React, { Component, ReactNode } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import HTML, {
  HtmlAttributesDictionary,
  RendererDictionary,
  PassProps,
  NonRegisteredStylesProp
} from 'react-native-render-html';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { RootStackParamList } from 'src/shared/navigator';

import { Thread } from './thread';

type State = {
  spoilers: {
    [key: string]: boolean;
  };
  thread: Thread;
};

type Props = {
  thread: Thread;
  navigation: StackNavigationProp<RootStackParamList, 'Catalog'>;
};

/**
 * Rendering a thread in the catalog
 */
export class CatalogThreadComponent extends Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      spoilers: {},
      thread: props.thread
    };
  }

  render(): ReactNode {
    const thread = this.state.thread;
    return (
      <View style={styles.thread}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Thread', { no: thread.no });
          }}
        >
          <View style={styles.tn_container}>
            <Image
              source={{ uri: 'https://i.4cdn.org/a/' + thread.tim + 's.jpg' }}
              style={{ height: thread.tn_h / 2 }}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.stats}>
            {thread.replies} / {thread.images} / {thread.page}
          </Text>
          {thread.sub && <Text style={styles.sub}>{thread.sub}</Text>}
          {thread.com && (
            <HTML
              html={'<p>' + thread.com + '</p>'}
              renderers={this.renderers(thread)}
              tagsStyles={{
                p: {
                  textAlign: 'center'
                }
              }}
              containerStyle={styles.com_container}
            />
          )}
        </TouchableOpacity>
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
      s: {
        renderer: (
          htmlAttribs: HtmlAttributesDictionary,
          children: ReactNode,
          convertedCSSStyles: NonRegisteredStylesProp<any>,
          passProps: PassProps
        ) => this.renderSTag(children, thread, passProps),
        wrapper: 'View'
      }
    };
  }

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
    if (typeof spoilers[key] === 'undefined') {
      spoilers[key] = false; // false == Don't show spoiler
    }

    let html: ReactNode = (
      <Text
        key={thread.no}
        style={!spoilers[key] && styles.s}
        onPress={() => this.onSpoilerPress(key)}
      >
        {children}
      </Text>
    );

    return html;
  }

  /**
   * @param key to identify pressed spoiler
   */
  private onSpoilerPress(key: number) {
    // Change spoiler status
    this.state.spoilers[key] = !this.state.spoilers[key];

    // Force html to rerender by adding span
    this.state.thread.com = this.state.thread.com + '<span></span>';
    this.setState({
      spoilers: this.state.spoilers
    });
  }
}

const styles = StyleSheet.create({
  thread: {
    margin: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  s: {
    backgroundColor: 'black'
  },
  sub: {
    fontWeight: 'bold',
    color: '#0f0c5d',
    textAlign: 'center'
  },
  stats: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  tn_container: {
    elevation: 3,
    backgroundColor: '#eef2ff',
    width: '100%',
    marginBottom: 2
  },
  com_container: {
    maxHeight: 200,
    overflow: 'hidden'
  }
});
