import { createAction } from '@reduxjs/toolkit';

import { Post } from 'src/post/post';

export const invalidateThread = createAction('INVALIDATE_THREAD');
export const fetchThreadFailed = createAction<string>('FETCH_THREAD_FAILED');
export const fetchThread = createAction('FETCH_THREAD', function prepare(
  boardId: string,
  threadNo: number
) {
  return {
    payload: {
      boardId,
      threadNo
    }
  };
});
export const fetchThreadSucceeded = createAction(
  'FETCH_THREAD_SUCCEEDED',
  function prepare(boardId: string, threadNo: number, posts: Post[]) {
    return {
      payload: {
        boardId,
        threadNo,
        posts,
        receivedAt: Date.now()
      }
    };
  }
);

export default {
  invalidateThread,
  fetchThreadFailed,
  fetchThreadSucceeded,
  fetchThread
};
