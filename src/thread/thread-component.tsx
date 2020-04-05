import React, { useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import HTML from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Post } from 'src/post/post';
import { RootStackParamList } from 'src/shared/navigator';
import { RootState } from 'src/shared/root-reducer';

import * as actions from './thread-actions';

/**
 * Render a thread
 */
export const ThreadComponent = () => {
  const dispatch = useDispatch();

  const route: RouteProp<RootStackParamList, 'Thread'> = useRoute();
  const { boardId, threadNo } = route.params;

  const posts = useSelector((state: RootState) => state.thread.posts);

  useEffect(() => {
    dispatch(actions.fetchThread(boardId, threadNo));
    return function cleanup() {
      dispatch(actions.invalidateThread());
    };
  }, [dispatch, boardId, threadNo]);

  const isFetching: boolean = useSelector(
    (state: RootState) => state.thread.isFetching
  );

  const onRefresh = React.useCallback(() => {
    dispatch(actions.fetchThread(boardId, threadNo));
  }, [dispatch, boardId, threadNo]);

  return (
    <FlatList<Post>
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
      style={styles.thread}
      data={posts}
      keyExtractor={item => item.no.toString()}
      renderItem={({ item }) => <HTML html={item.com || '<span></span>'} />}
    />
  );
};

const styles = StyleSheet.create({
  thread: {
    backgroundColor: '#eef2ff'
  }
});
