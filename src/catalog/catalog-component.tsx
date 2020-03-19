import React, { Component, ReactNode } from 'react';
import { Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Catalog } from 'src/catalog/catalog';
import { Thread } from 'src/catalog/thread';
import { CatalogThreadComponent } from './catalog-thread-component';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/navigator';

type State = {
  threads: Thread[];
  refreshing: boolean;
}

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Catalog'>;
}

/**
 * Render the catalog
 */
export class CatalogComponent extends Component<Props, State> {

  state: State;

   constructor(props: Props) {
    super(props);

    this.state = {
      threads: [],
      refreshing: true
    };

    this.retriveCatalog();
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.retriveCatalog();
  }

  /**
   * Get the catalog from the 4chan api
   */
  private retriveCatalog(): void {
    fetch('https://a.4cdn.org/a/catalog.json')
      .then((response: Response) => {
        let threads: Thread[] = [];

        // Extract threads from the catalog and set the thread's page so that
        // we can use a single FlatList rather than one per page.
        response.json().then((catalogs: Catalog[]) => {
          catalogs.forEach((catalog) => {
            catalog.threads.forEach((thread) => {
              thread.page = catalog.page;
              threads.push(thread);
            })
          });
          this.setState({
            threads: threads,
            refreshing: false
          });
        });
      }).catch((error) => {
        console.error(error);
      });
  }

  render(): ReactNode {
    if (this.state.threads.length > 0) {
      const threads = this.state.threads;
      return (
        <FlatList<Thread>
          refreshControl= {
            <RefreshControl 
              refreshing={this.state.refreshing} 
              onRefresh={this.onRefresh} 
            />
          }
          style={styles.catalog}
          data={threads}
          numColumns={3}
          keyExtractor={(item) => item.no.toString()}
          renderItem={({ item }) => 
            <CatalogThreadComponent 
              navigation={this.props.navigation}
              thread={item}
            />
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
});