import React, { useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Post } from 'src/post/post';
import { RootStackParamList } from 'src/shared/navigator';
import { RootState } from 'src/shared/root-reducer';
import { PostComponent } from 'src/post/post-component';

import * as actions from './thread-actions';

/**
 * Render a thread
 */
export const ThreadComponent = () => {
  const dispatch = useDispatch();

  const route: RouteProp<RootStackParamList, 'Thread'> = useRoute();
  const { boardId, threadNo } = route.params;

  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    dispatch(actions.fetchThread(boardId, threadNo));
    return function cleanUp() {
      // Remove thread from memory when the user leaves it.
      dispatch(actions.invalidateThread());
    };
  }, [dispatch, boardId, threadNo]);

  const isFetching: boolean = useSelector(
    (state: RootState) => state.thread.isFetching
  );

  const onRefresh = React.useCallback(() => {
    dispatch(actions.fetchThread(boardId, threadNo));
  }, [dispatch, boardId, threadNo]);

  const renderItem = (item: any) => <PostComponent postNo={item.item.no} />;

  const keyExtractor = (item: any) => {
    return item.no.toString();
  };
  return (
    <FlatList<Post>
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
      style={styles.thread}
      data={Object.values(posts)}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      removeClippedSubviews={false}
    />
  );
};

const styles = StyleSheet.create({
  thread: {
    backgroundColor: '#eef2ff'
  }
});
