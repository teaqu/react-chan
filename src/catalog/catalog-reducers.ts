import { createReducer } from '@reduxjs/toolkit';
import { Thread } from './thread';
import { requestCatalog, recieveCatalog } from './catalog-actions';

export interface CatalogState {
  isFetching: boolean;
  threads: Thread[];
}

const initialState: CatalogState = {
  isFetching: false,
  threads: []
};

export default createReducer(initialState, {
  [requestCatalog.type]: state => {
    state.isFetching = true;
  },
  [recieveCatalog.type]: (state, action) => {
    state.isFetching = false;
    state.threads = action.payload.threads;
  }
});
