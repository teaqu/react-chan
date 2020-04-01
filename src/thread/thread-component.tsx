import React, { Component, ReactNode } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import HTML from 'react-native-render-html';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { RootStackParamList } from 'src/shared/navigator';
import { RootState } from 'src/shared/root-reducer';
import { Post } from 'src/post/post';

import * as actions from './thread-actions';
import { ThreadState } from './thread-reducuer';

type Props = {
  route: RouteProp<RootStackParamList, 'Thread'>;
  thread: ThreadState;
  fetchThread: (boardId: string, threadNo: number) => void;
  invalidateThread: () => void;
};

/**
 * Render a thread
 */
class ThreadComponent extends Component<Props, RootState> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {
    this.props.invalidateThread();
  }

  onRefresh = () => {
    this.props.fetchThread(
      this.props.route.params.boardId,
      this.props.route.params.threadNo
    );
  };

  render(): ReactNode {
    const { thread } = this.props;
    return (
      <FlatList<Post>
        refreshControl={
          <RefreshControl
            refreshing={thread.isFetching}
            onRefresh={this.onRefresh}
          />
        }
        style={styles.thread}
        data={thread.posts}
        keyExtractor={item => item.no.toString()}
        renderItem={({ item }) => (
          <HTML html={item.com} key={item.no.toString()} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  thread: {
    backgroundColor: '#eef2ff'
  }
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, Action<string>>
) => {
  return {
    fetchThread: (boardId: string, threadNo: number) => {
      dispatch(actions.fetchThread(boardId, threadNo));
    },
    invalidateThread: () => {
      dispatch(actions.invalidateThread());
    }
  };
};

const mapStateToProps = (state: RootState) => ({
  thread: state.thread
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadComponent);
