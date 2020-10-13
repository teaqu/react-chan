import React, { useEffect } from 'react';
import { StyleSheet, RefreshControl, Animated, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useCollapsibleHeader } from 'react-navigation-collapsible';

import { Post } from 'src/post/post';
import { RootStackParamList } from 'src/shared/navigator';
import { RootState } from 'src/shared/root-reducer';
import { PostComponent } from 'src/post/post-component';
import { ThreadFooterComponent } from 'src/thread/thread-footer-component';

import * as actions from './thread-actions';

/**
 * Render a thread
 */
export const ThreadComponent = () => {
  const dispatch = useDispatch();

  const options = {
    headerStyle: { backgroundColor: '#d6daf0' },
    elevation: 1
  };
  let {
    onScroll,
    containerPaddingTop,
    scrollIndicatorInsetTop
  } = useCollapsibleHeader(options);

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
      // Remove heading padding
      if (index !== 0) {
        offset += 50;
      }

      // Extra padding at bottom of thread
      // This helps when using scrollToEnd
      if (data.length === index + 1) {
        offset += 10;
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
      <Animated.FlatList<Post>
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={onRefresh}
            progressViewOffset={40}
          />
        }
        getItemLayout={getItemLayout}
        style={styles.thread}
        data={data}
        // @ts-ignore
        onScroll={onScroll}
        contentContainerStyle={{ paddingTop: containerPaddingTop }}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        extraData={refresh}
        ref={ref => {
          if (ref) {
            dispatch(actions.setListRef(ref));
          }
        }}
        ListFooterComponent={ThreadFooterComponent}
      />
    );
  } else {
    // Show loading indicator before thread has loaded.
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={onRefresh}
            progressViewOffset={40}
          />
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
