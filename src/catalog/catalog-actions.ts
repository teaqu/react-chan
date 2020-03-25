import { ThunkAction } from 'redux-thunk';
import { createAction, Action } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';

import { RootState } from 'src/shared/root-reducer';

import { Thread } from './thread';
import { Catalog } from './catalog';
import { catalogSchema } from './catalog-schemas';

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action<string>>;

export const requestCatalog = createAction<string>('REQUEST_CATALOG');
export const recieveCatalog = createAction('RECEVE_CATALOG', function prepare(
  board: string,
  threads: Thread[]
) {
  return {
    payload: {
      board,
      threads,
      receivedAt: Date.now()
    }
  };
});

export function fetchCatalog(board: string): ThunkResult<void> {
  return function(dispatch) {
    dispatch(requestCatalog(board));
    return fetch(`https://a.4cdn.org/${board}/catalog.json`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then((catalogs: Catalog[]) => {
        const threads: Thread[] = Object.values(
          normalize(catalogs, [catalogSchema]).entities.threads || []
        );
        threads.sort((a: Thread, b: Thread) => {
          return a.last_modified < b.last_modified ? 1 : 0;
        });
        dispatch(recieveCatalog(board, threads));
      });
  };
}

function shouldFetchCatalog(state: RootState) {
  const catalog = state.catalog;
  if (!catalog) {
    return true;
  } else if (catalog.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchCatalogIfNeeded(board: string): ThunkResult<void> {
  return (dispatch, getState) => {
    if (shouldFetchCatalog(getState())) {
      return dispatch(fetchCatalog(board));
    }
  };
}
