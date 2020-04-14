import { createAction } from '@reduxjs/toolkit';

import { Posts, ReplyLinks } from 'src/shared/chan-api/chan-api';

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
  function prepare(boardId: string, threadNo: number, posts: Posts) {
    return {
      payload: {
        threadNo,
        posts,
        receivedAt: Date.now()
      }
    };
  }
);
export const calcReplies = createAction('CALC_REPLIES');
export const calcRepliesSucceeded = createAction<ReplyLinks>(
  'CALC_REPLIES_SUCCEEDED'
);
export const calcRepliesFailed = createAction<string>('CALC_REPLIES_FAILED');

export default {
  invalidateThread,
  fetchThreadFailed,
  fetchThreadSucceeded,
  fetchThread,
  calcRepliesFailed,
  calcRepliesSucceeded,
  calcReplies
};
