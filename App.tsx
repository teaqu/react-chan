/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component, ReactNode } from 'react';
import { FlatList, ListRenderItem, TouchableHighlight } from 'react-native';

import HTML from 'react-native-render-html'; 

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type Catalog = {
  page: number;
  threads: Thread[];
}

type Thread = {
  no: number;
  now: string;
  name: string;
  sub: string;
  com: string;
  filename: string;
  ext: string;
  w: number;
  h: number;
  tn_w: number;
  tn_h: number;
  tim: number;
  time: number;
  md5: string;
  fsize: number;
  resto: number;
  bumplimit: number;
  imagelimit: number;
  semantic_url: string;
  custom_spoiler: number;
  replies: number;
  images : number;
  omitted_posts: number;
  omitted_images: number;
  last_replies: Reply[];
  last_modified: number;
}

type Reply = {
  no: number;
  now: string;
  name: string;
  com: string;
  time: number;
  resto: number;
}

type State = {
  catalog: Catalog[]|null;
}

type Props = {}


declare var global: {HermesInternal: null | {}};

export default class App extends Component {

  state: State;

   constructor(props: Props) {
    super(props);

    this.state = {
      catalog: null
    };

    this.getCatalog();
  }

  getCatalog(): void {
    fetch('https://a.4cdn.org/a/catalog.json')
      .then((response) => {
        response.json().then(value => {
          this.setState({
            catalog: value
          })
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // @todo variable height
  render(): ReactNode {
    if (this.state.catalog) {
      var catalog: Catalog = this.state.catalog[1];
      var threads: Thread[] = catalog.threads;
      var html = [];
      for (var i = 0; i < threads.length; ++i) {
        html.push(
          <View style={styles.thread}>
            <Image 
              source={{uri: 'https://i.4cdn.org/a/' + threads[i].tim + 's.jpg'}}
              style={{width: '100%', height: 100}} />
            <Text>{threads[i].com}</Text>
          </View>
        );
      }
      return (
        <FlatList<Thread>
          style={styles.catalog}
          data={threads}
          numColumns={3}
          renderItem={({ item }) => 
            <View style={styles.thread} key={item.no}>
              <Image 
                source={{uri: 'https://i.4cdn.org/a/' + item.tim + 's.jpg'}}
                style={{width: '100%', height: 100}} 
              /> 
              <HTML
                html={item.com} 
                renderers = {{
                    's': function (htmlAttribs, children) {
                      return (
                        <TouchableHighlight onPress = {() => {
                          console.log('open spoiler')
                        }}>
                          <Text style={{ backgroundColor: 'black' }} >{children}</Text>
                        </TouchableHighlight>
                      )
                    }
                }}
              />
            </View>
          }
        />
      )
    } else {
      return (
        <>
            <Text>Loading...</Text>
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  catalog: {
    backgroundColor: '#eef2ff',
  },
  thread: {
    margin: 2,
    padding: 2,
    flex: 1,
    height: 300,
    maxHeight: 300,
    flexDirection: 'column'
  },
  thread_comment: {
  },
  s: {
    backgroundColor: 'black',
    color: 'red'
  }
});