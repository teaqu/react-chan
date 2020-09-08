import { createReducer } from '@reduxjs/toolkit';
import { FlatList } from 'react-native';

import { Post } from 'src/post/post';

import {
  fetchThreadFailed,
  fetchThread,
  fetchThreadSucceeded,
  setListRef
} from './thread-actions';

export interface ThreadState {
  isFetching: boolean;
  error: string;
  threadNo: number;
  listRef: FlatList<Post> | null;
}

const initialState: ThreadState = {
  isFetching: false,
  error: '',
  threadNo: 0,
  listRef: null
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
  },
  [setListRef.type]: (state, action) => {
    state.listRef = action.payload;
  }
});
