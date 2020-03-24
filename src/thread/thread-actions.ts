import { ThunkAction } from 'redux-thunk';
import { createAction, Action } from '@reduxjs/toolkit';

import { RootState } from 'src/shared/root-reducer';

import { Post } from './post';

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action<string>>;

export const invalidateThread = createAction('INVALIDATE_THREAD');
export const requestThread = createAction('REQUEST_THREAD', function prepare(
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
export const recieveThread = createAction('RECEVE_THREAD', function prepare(
  boardId: string,
  threadNo: number,
  posts: Post[]
) {
  return {
    payload: {
      boardId,
      threadNo,
      posts,
      receivedAt: Date.now()
    }
  };
});

export function fetchThread(
  boardId: string,
  threadNo: number
): ThunkResult<void> {
  return function(dispatch) {
    dispatch(requestThread(boardId, threadNo));
    return fetch(`https://a.4cdn.org/${boardId}/thread/${threadNo}.json`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(thread => {
        const posts: Post[] = thread.posts;
        dispatch(recieveThread(boardId, threadNo, posts));
      });
  };
}

function shouldFetchThread(state: RootState) {
  const thread = state.thread;
  return !thread.isFetching;
}

export function fetchThreadIfNeeded(
  boardId: string,
  threadNo: number
): ThunkResult<void> {
  return (dispatch, getState) => {
    if (shouldFetchThread(getState())) {
      return dispatch(fetchThread(boardId, threadNo));
    }
  };
}
