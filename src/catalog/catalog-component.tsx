import React, { useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';
import { Threads } from 'src/shared/chan-api/chan-api';

import { Thread } from '../thread/thread';

import { CatalogThreadComponent } from './catalog-thread-component';
import actions from './catalog-actions';

export function CatalogComponent() {
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

  return (
    // Selectable text requires removeClippedSubviews={false}
    // https://github.com/facebook/react-native/issues/26264#issuecomment-558989904
    <FlatList<Thread>
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
      style={styles.catalog}
      data={Object.values(threads)}
      numColumns={3}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  catalog: {
    backgroundColor: '#eef2ff'
  }
});
