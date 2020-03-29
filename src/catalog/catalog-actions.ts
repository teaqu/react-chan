import { ThunkAction } from 'redux-thunk';
import { createAction, Action } from '@reduxjs/toolkit';

import { RootState } from 'src/shared/root-reducer';

import { Thread } from './thread';
import { Catalog } from './catalog';

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action<string>>;

export const requestCatalog = createAction<string>('REQUEST_CATALOG');
export const receiveCatalog = createAction('RECEIVE_CATALOG', function prepare(
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

function fetchCatalog(board: string): ThunkResult<Promise<Thread[]>> {
  return function(dispatch) {
    dispatch(requestCatalog(board));
    return fetch(`https://a.4cdn.org/${board}/catalog.json`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then((catalogs: Catalog[]) => {
        const threads: Thread[] = catalogs.flatMap((catalog: Catalog) => {
          return catalog.threads.map(thread => {
            return { ...thread, page: catalog.page };
          });
        });
        dispatch(receiveCatalog(board, threads));
        return threads;
      });
  };
}

function shouldFetchCatalog(state: RootState) {
  return !state.catalog.isFetching;
}

export function fetchCatalogIfNeeded(
  board: string
): ThunkResult<Promise<Thread[]>> {
  return (dispatch, getState) => {
    if (shouldFetchCatalog(getState())) {
      return dispatch(fetchCatalog(board));
    } else {
      return Promise.resolve([]);
    }
  };
}
