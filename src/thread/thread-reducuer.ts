import { createReducer } from '@reduxjs/toolkit';

import { Post } from 'src/post/post';

import {
  invalidateThread,
  fetchThreadFailed,
  fetchThread,
  fetchThreadSucceeded
} from './thread-actions';

export interface ThreadState {
  isFetching: boolean;
  posts: Post[];
  error: string;
}

const initialState: ThreadState = {
  isFetching: false,
  posts: [],
  error: ''
};

export default createReducer(initialState, {
  [invalidateThread.type]: state => {
    state.posts = [];
  },
  [fetchThread.type]: state => {
    state.isFetching = true;
  },
  [fetchThreadSucceeded.type]: (state, action) => {
    state.isFetching = false;
    state.posts = action.payload.posts;
  },
  [fetchThreadFailed.type]: (state, action) => {
    state.error = action.payload;
    state.isFetching = true;
  }
});
