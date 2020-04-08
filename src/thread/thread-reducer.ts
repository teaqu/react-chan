import { createReducer } from '@reduxjs/toolkit';

import {
  fetchThreadFailed,
  fetchThread,
  fetchThreadSucceeded
} from './thread-actions';

export interface ThreadState {
  isFetching: boolean;
  error: string;
}

const initialState: ThreadState = {
  isFetching: false,
  error: ''
};

export default createReducer(initialState, {
  [fetchThread.type]: state => {
    state.isFetching = true;
  },
  [fetchThreadSucceeded.type]: state => {
    state.isFetching = false;
  },
  [fetchThreadFailed.type]: (state, action) => {
    state.error = action.payload;
    state.isFetching = true;
  }
});
