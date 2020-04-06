import { createReducer } from '@reduxjs/toolkit';

import { Thread } from '../thread/thread';

import actions from './catalog-actions';

export interface CatalogState {
  boardId: string;
  error: string;
  isFetching: boolean;
  threads: Thread[];
}

const initialState: CatalogState = {
  boardId: '',
  error: '',
  isFetching: false,
  threads: []
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
    state.threads = [];
  }
});
