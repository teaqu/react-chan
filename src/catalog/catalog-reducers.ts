import { createReducer } from '@reduxjs/toolkit';

import { Thread } from './thread';
import { requestCatalog, receiveCatalog } from './catalog-actions';

export interface CatalogState {
  board: string;
  isFetching: boolean;
  threads: Thread[];
}

const initialState: CatalogState = {
  board: '',
  isFetching: false,
  threads: []
};

export default createReducer(initialState, {
  [requestCatalog.type]: (state, action) => {
    state.board = action.payload;
    state.isFetching = true;
  },
  [receiveCatalog.type]: (state, action) => {
    state.board = action.payload.board;
    state.isFetching = false;
    state.threads = action.payload.threads;
  }
});
