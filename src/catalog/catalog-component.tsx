import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';

import { Thread } from '../thread/thread';

import { CatalogThreadComponent } from './catalog-thread-component';
import actions from './catalog-actions';

export function CatalogComponent() {
  const dispatch = useDispatch();
  const boardId = useSelector((state: RootState) => state.boardPicker.boardId);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      dispatch(actions.invalidateCatalog());
    }
    mounted.current = true;
    dispatch(actions.fetchCatalog(boardId));
  }, [boardId, dispatch]);

  const threads: Thread[] = useSelector(
    (state: RootState) => state.catalog.threads
  );
  const isFetching: boolean = useSelector(
    (state: RootState) => state.catalog.isFetching
  );

  const onRefresh = React.useCallback(() => {
    dispatch(actions.fetchCatalog(boardId));
  }, [boardId, dispatch]);

  const renderItem = (item: any) => {
    return <CatalogThreadComponent boardId={boardId} thread={item.item} />;
  };

  const keyExtractor = (item: any) => {
    return item.no.toString();
  };

  return (
    // Selectable text requires removeClippedSubviews={false}
    // https://github.com/facebook/react-native/issues/26264#issuecomment-558989904
    <FlatList<Thread>
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
      style={styles.catalog}
      data={threads}
      numColumns={3}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      windowSize={1000}
    />
  );
}

const styles = StyleSheet.create({
  catalog: {
    backgroundColor: '#eef2ff'
  }
});
