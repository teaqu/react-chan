import { Catalog } from './catalog';
import { Thread } from './thread';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'src/shared/root-reducer';

type ThunkResult<R> = ThunkAction<R, RootState, undefined, CatalogActionTypes>;

export const REQUEST_CATALOG = 'REQUEST_CATALOG';
export interface RequestCatalogAction {
  type: typeof REQUEST_CATALOG;
  board: string;
}
function requestCatalog(board: string): RequestCatalogAction {
  return {
    type: REQUEST_CATALOG,
    board
  };
}

export const RECEIVE_CATALOG = 'RECEIVE_CATALOG';
export interface ReciveCatalogAction {
  type: typeof RECEIVE_CATALOG;
  board: string;
  threads: Thread[];
  receivedAt: number;
}
function recieveCatalog(board: string, threads: Thread[]): ReciveCatalogAction {
  return {
    type: RECEIVE_CATALOG,
    board,
    threads: threads,
    receivedAt: Date.now()
  };
}

export function fetchCatalog(board: string): ThunkResult<void> {
  return function(dispatch) {
    dispatch(requestCatalog(board));
    return fetch(`https://a.4cdn.org/${board}/catalog.json`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then((catalogs: Catalog[]) => {
        const threads = catalogs
          .map(catalog => {
            return catalog.threads.map(thread => {
              thread.page = catalog.page;
              return thread;
            });
          })
          .reduce((prev, curr) => {
            return prev.concat(curr);
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

export type CatalogActionTypes = RequestCatalogAction | ReciveCatalogAction;
