import { createReducer } from '@reduxjs/toolkit';

import { Thread } from './thread';
import { requestCatalog, receiveCatalog } from './catalog-actions';

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
  [receiveCatalog.type]: (state, action) => {
    state.isFetching = false;
    state.threads = action.payload.threads;
  }
});
