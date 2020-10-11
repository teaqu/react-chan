import React, { useEffect } from 'react';
import { Animated, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useCollapsibleHeader } from 'react-navigation-collapsible';

import { RootState } from 'src/shared/root-reducer';
import { Threads } from 'src/shared/chan-api/chan-api';

import { Thread } from '../thread/thread';

import { CatalogThreadComponent } from './catalog-thread-component';
import actions from './catalog-actions';

export function CatalogComponent() {
  const options = {
    headerStyle: {
      backgroundColor: '#d6daf0'
    },
    elevation: 1
  };
  const {
    onScroll /* Event handler */,
    containerPaddingTop /* number */,
    scrollIndicatorInsetTop /* number */
  } = useCollapsibleHeader(options);
  const dispatch = useDispatch();
  const boardId = useSelector((state: RootState) => state.boardPicker.boardId);

  useEffect(() => {
    dispatch(actions.fetchCatalog(boardId));
  }, [boardId, dispatch]);

  const threads: Threads = useSelector(
    (state: RootState) => state.catalog.threads
  );
  const isFetching: boolean = useSelector(
    (state: RootState) => state.catalog.isFetching
  );
  const onRefresh = React.useCallback(() => {
    dispatch(actions.fetchCatalog(boardId));
  }, [boardId, dispatch]);
  const renderItem = (item: any) => (
    <CatalogThreadComponent boardId={boardId} threadNo={item.item.no} />
  );
  const keyExtractor = (item: any) => item.no.toString();
  let threadsArray = Object.values(threads).sort(
    (a, b) => b.last_modified - a.last_modified
  );
  return (
    <Animated.FlatList<Thread>
      data={threadsArray}
      // @ts-ignore
      onScroll={onScroll}
      contentContainerStyle={{ paddingTop: containerPaddingTop }}
      scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={onRefresh}
          progressViewOffset={40}
        />
      }
      style={styles.catalog}
      numColumns={3}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  catalog: {
    backgroundColor: '#eef2ff',
    minHeight: 100
  }
});
