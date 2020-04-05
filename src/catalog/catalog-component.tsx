import React, { useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';

import { Thread } from '../thread/thread';

import { CatalogThreadComponent } from './catalog-thread-component';
import actions from './catalog-actions';

export function CatalogComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchCatalog('a'));
  }, [dispatch]);

  const threads: Thread[] = useSelector(
    (state: RootState) => state.catalog.threads
  );
  const isFetching: boolean = useSelector(
    (state: RootState) => state.catalog.isFetching
  );

  const onRefresh = React.useCallback(() => {
    dispatch(actions.fetchCatalog('a'));
  }, [dispatch]);

  const renderItem = (item: any) => {
    return <CatalogThreadComponent thread={item.item} />;
  };

  const keyExtractor = (item: any) => {
    return item.no.toString();
  };

  return (
    <FlatList<Thread>
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
      style={styles.catalog}
      data={threads}
      numColumns={3}
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
