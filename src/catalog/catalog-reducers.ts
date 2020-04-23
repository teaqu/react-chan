import { createReducer } from '@reduxjs/toolkit';

import { Threads } from 'src/shared/chan-api/chan-api';

import actions from './catalog-actions';

export interface CatalogState {
  boardId: string;
  error: string;
  isFetching: boolean;
  threads: Threads;
}

const initialState: CatalogState = {
  boardId: '',
  error: '',
  isFetching: false,
  threads: {}
};

export default createReducer(initialState, {
  [actions.fetchCatalog.type]: (state, action) => {
    state.boardId = action.payload;
    state.isFetching = true;
  },
  [actions.fetchCatalogSucceeded.type]: (state, action) => {
    state.boardId = action.payload.boardId;
    state.isFetching = false;
    state.threads = action.payload.threads;
  },
  [actions.fetchCatalogFailed.type]: (state, action) => {
    state.error = action.payload;
    state.isFetching = true;
  },
  [actions.invalidateCatalog.type]: state => {
    state.threads = {};
    state.isFetching = true;
  }
});
