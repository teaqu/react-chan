import { createReducer } from '@reduxjs/toolkit';

import {
  fetchThreadFailed,
  fetchThread,
  fetchThreadSucceeded
} from './thread-actions';

export interface ThreadState {
  isFetching: boolean;
  error: string;
  threadNo: number;
}

const initialState: ThreadState = {
  isFetching: false,
  error: '',
  threadNo: 0
};

export default createReducer(initialState, {
  [fetchThread.type]: (state, action) => {
    state.isFetching = true;
    state.threadNo = action.payload.threadNo;
  },
  [fetchThreadSucceeded.type]: state => {
    state.isFetching = false;
  },
  [fetchThreadFailed.type]: (state, action) => {
    state.error = action.payload;
    state.isFetching = true;
  }
});
