import React, { Component, ReactNode } from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html'; 
import { Catalog } from 'src/interfaces/catalog';
import { Thread } from 'src/interfaces/thread';

type State = {
  catalog: Catalog[];
}

type Props = {}

export class CatalogScreen extends Component {

  state: State;

   constructor(props: Props) {
    super(props);

    this.state = {
      catalog: []
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
      const catalog = this.state.catalog;
      var threads: Thread[] = [];
      
      // Loop through catalog pages
      for (var i = 0; i < catalog.length; ++i) {

        // Add catalog page to thread
        catalog[i].threads.map((thread) => {
          thread.page = catalog[i].page;
        });[]

        // Concat all thread pages
        threads = threads.concat(catalog[i].threads);
      }
      
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
          keyExtractor={(item) => item.no.toString()}
          renderItem={({ item }) => 
            <View style={styles.thread}>
              <Image 
                source={{uri: 'https://i.4cdn.org/a/' + item.tim + 's.jpg'}}
                style={{width: '100%', height: 100}} 
              /> 
              <Text style={styles.stats}>
                {item.replies} / {item.images} / {item.page}
              </Text>
              {item.sub && <Text style={styles.sub}>{item.sub}</Text>}
              {item.com && 
                <HTML
                  html={item.com}
                  renderers = {{
                    's': function (htmlAttribs, children) {
                      return (
                        <Text style={{ backgroundColor: 'black' }} key={item.no} >
                          {children}
                        </Text>
                      )
                    }
                  }}
                />
              }
              
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
    maxHeight: 300,
    flexDirection: 'column'
  },
  thread_comment: {
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