import { createReducer } from '@reduxjs/toolkit';

import { Post } from './post';
import {
  requestThread,
  recieveThread,
  invalidateThread
} from './thread-actions';

export interface ThreadState {
  isFetching: boolean;
  posts: Post[];
}

const initialState: ThreadState = {
  isFetching: false,
  posts: []
};

export default createReducer(initialState, {
  [invalidateThread.type]: state => {
    state.posts = [];
  },
  [requestThread.type]: state => {
    state.isFetching = true;
  },
  [recieveThread.type]: (state, action) => {
    state.isFetching = false;
    state.posts = action.payload.posts;
  }
});
