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
      dispatch(actions.invalidateThread());
    };
  }, [dispatch, boardId, threadNo]);

  const isFetching: boolean = useSelector(
    (state: RootState) => state.thread.isFetching
  );

  const onRefresh = React.useCallback(() => {
    dispatch(actions.fetchThread(boardId, threadNo));
  }, [dispatch, boardId, threadNo]);

  const renderItem = (item: any) => {
    return <PostComponent postIndex={item.item.index} isReply={false} />;
  };

  // A large window size does mean every post is loaded at once which isn't
  // ideal but it leads to less renders in the long run as it stops FlatList
  // unmounting every post out of view.
  return (
    <FlatList<Post>
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
      style={styles.thread}
      data={posts}
      keyExtractor={item => item.no.toString()}
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
