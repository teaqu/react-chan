import React, { useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

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
  const postStates = useSelector((state: RootState) => state.posts.postStates);

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

  /**
   * Get the item layout so that we can jump to the given index.
   *
   * @param data the posts
   * @param index
   */
  const getItemLayout = (data: Post[] | null | undefined, index: number) => {
    let offset = 0;
    if (data) {
      let postStatesArr = Object.values(postStates);

      // Calculate offset by adding heights of all the posts before the
      // given index.
      for (let i = 0; i < index; i++) {
        if (!postStatesArr[i].hidden) {
          offset += postStatesArr[i].height + 5; // Post height + padding
        }
      }
      return {
        length: postStates[data[index].no].height,
        offset,
        index
      };
    } else {
      return {
        length: 0,
        offset,
        index
      };
    }
  };
  let data = Object.values(posts);
  let refresh = 0;
  if (
    Object.values(postStates).length >= data.length &&
    typeof Object.values(postStates)[0] === 'object' &&
    Object.values(postStates)[0].height > 0
  ) {
    return (
      <FlatList<Post>
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        getItemLayout={getItemLayout}
        style={styles.thread}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews={false}
        extraData={refresh}
        ref={ref => {
          if (ref) {
            dispatch(actions.setListRef(ref));
          }
        }}
      />
    );
  } else {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
      />
    );
  }
};
const styles = StyleSheet.create({
  thread: {
    backgroundColor: '#eef2ff'
  }
});
