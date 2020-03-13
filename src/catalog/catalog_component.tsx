import React, { Component, ReactNode } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { Catalog } from 'src/catalog/catalog';
import { Thread } from 'src/thread/thread';
import { CatalogThreadComponent } from './catalog_thread_component';

type State = {
  threads: Thread[];
}

type Props = {}

/**
 * Render the catalog
 */
export class CatalogComponent extends Component {

  state: State;

   constructor(props: Props) {
    super(props);

    this.state = {
      threads: [],
    };

    this._retriveCatalog();
  }

  render(): ReactNode {
    if (this.state.threads.length > 0) {
      const threads = this.state.threads;
      return (
        <FlatList<Thread>
          style={styles.catalog}
          data={threads}
          numColumns={3}
          keyExtractor={(item) => item.no.toString()}
          renderItem={({ item }) => 
            <CatalogThreadComponent thread={item}/>
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

  /**
   * Get the catalog from the 4chan api
   */
  private _retriveCatalog(): void {
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
            threads: threads
          });
        });
      }).catch((error) => {
        console.error(error);
      });
  }

}

const styles = StyleSheet.create({
  catalog: {
    backgroundColor: '#eef2ff',
  },
});