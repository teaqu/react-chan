import { createAction } from '@reduxjs/toolkit';
import { FlatList } from 'react-native-gesture-handler';

import { Posts, ReplyLinks } from 'src/shared/chan-api/chan-api';
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
export const setListRef = createAction<FlatList<Post>>('SET_LIST_REF');

export const calcHeights = createAction('CALC_HEIGHTS');
export const calcHeightsSucceeded = createAction<number[]>(
  'CALC_HEIGHTS_SUCCEEDED'
);

export default {
  invalidateThread,
  fetchThreadFailed,
  fetchThreadSucceeded,
  fetchThread,
  calcRepliesFailed,
  calcRepliesSucceeded,
  calcReplies,
  calcHeights,
  calcHeightsSucceeded
};
