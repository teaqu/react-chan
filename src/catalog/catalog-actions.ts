import { createAction } from '@reduxjs/toolkit';

import { Thread } from '../thread/thread';

const fetchCatalog = createAction<string>('FETCH_CATALOG');
const fetchCatalogFailed = createAction<string>('FETCH_CATALOG_FAILED');
const fetchCatalogSucceeded = createAction(
  'FETCH_CATALOG_SUCCEEDED',
  function prepare(boardId: string, threads: Thread[]) {
    return {
      payload: {
        boardId,
        threads,
        receivedAt: Date.now()
      }
    };
  }
);
const invalidateCatalog = createAction('INVALIDATE_CATALOG');

export default {
  fetchCatalog,
  fetchCatalogFailed,
  fetchCatalogSucceeded,
  invalidateCatalog
};
