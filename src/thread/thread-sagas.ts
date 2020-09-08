import { call, put, takeLatest, getContext, select } from 'redux-saga/effects';

import { ChanAPI, Posts } from 'src/shared/chan-api/chan-api';
import { RootState } from 'src/shared/root-reducer';

import actions from './thread-actions';

interface fetchThreadAction {
  type: string;
  payload: {
    boardId: string;
    threadNo: number;
  };
}

/**
 * Fetch a thread from the API
 *
 * @param action
 */
export function* fetchThread(action: fetchThreadAction) {
  try {
    const chanAPI: ChanAPI = yield getContext('chanAPI');
    const boardId = action.payload.boardId;
    const threadNo = action.payload.threadNo;
    let posts: Posts = yield call(chanAPI.fetchThread, boardId, threadNo);
    yield put(actions.fetchThreadSucceeded(boardId, threadNo, posts));
  } catch (e) {
    console.log('fetch thread: ' + e);
    yield put(actions.fetchThreadFailed(e.message));
  }
}

/**
 * Calculate the replies for each post
 */
export function* calcReplies() {
  try {
    const chanAPI: ChanAPI = yield getContext('chanAPI');
    let posts: Posts = yield select((state: RootState) => state.posts.posts);

    const replyLinks = yield call(chanAPI.calcReplies, posts);
    yield put(actions.calcRepliesSucceeded(replyLinks));
  } catch (e) {
    console.log('calc replies: ' + e);
    yield put(actions.calcRepliesFailed(e.message));
  }
}

/**
 * Calculate the heights of each post for scrollToIndex.
 */
export function* calcHeights() {
  try {
    const chanAPI: ChanAPI = yield getContext('chanAPI');
    let posts: Posts = yield select((state: RootState) => state.posts.posts);
    const heights = yield call(chanAPI.calcHeights, posts);
    yield put(actions.calcHeightsSucceeded(heights));
  } catch (e) {
    console.log('calc heights: ' + e);
  }
}

export function* watchFetchThread() {
  yield takeLatest(actions.fetchThread, fetchThread);
}
export function* watchFetchThreadSucceeded() {
  yield takeLatest(actions.fetchThreadSucceeded, calcReplies);
  yield takeLatest(actions.calcRepliesSucceeded, calcHeights);
}
