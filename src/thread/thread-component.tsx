import React, { Component, ReactNode } from 'react';
import { Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Thread } from './thread';
import { Post } from './post';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigator';
import HTML from 'react-native-render-html';

type State = {
  thread: Thread | null;
  refreshing: boolean;
};

type Props = {
  route: RouteProp<RootStackParamList, 'Thread'>;
};

/**
 * Render the catalog
 */
export class ThreadComponent extends Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      refreshing: true,
      thread: null
    };

    this.retriveThread();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.retriveThread();
  };

  /**
   * Get the catalog from the 4chan api
   */
  private retriveThread(): void {
    const no = this.props.route.params.no;
    fetch('https://a.4cdn.org/a/thread/' + no + '.json')
      .then((response: Response) => {
        console.log(response);
        // Extract threads from the catalog and set the thread's page so that
        // we can use a single FlatList rather than one per page.
        response.json().then((thread: Thread) => {
          this.setState({
            thread: thread,
            refreshing: false
          });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render(): ReactNode {
    if (this.state.thread) {
      const thread = this.state.thread;
      return (
        <FlatList<Post>
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          style={styles.catalog}
          data={thread.posts}
          numColumns={1}
          keyExtractor={item => item.no.toString()}
          renderItem={({ item }) => (
            <HTML html={item.com} key={item.no.toString()} />
          )}
        />
      );
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
    backgroundColor: '#eef2ff'
  }
});
